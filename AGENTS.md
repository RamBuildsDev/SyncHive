# SyncHive Agent Guide

This file is the quick operating manual for coding agents working in this repo.
Read it before changing code.

## Project Summary

SyncHive is a self-hosted workflow automation platform, similar in spirit to
Zapier or n8n. Users build workflows visually as DAGs, activate them into
immutable version snapshots, trigger them manually, by webhook, or by schedule,
and monitor execution in real time.

The project is a TypeScript npm workspace monorepo.

## Repository Layout

- `apps/web` — React 18 + Vite frontend. Contains the landing page, auth pages,
  workflow list, React Flow editor, executions/logs, scheduler view, settings,
  and integrations pages.
- `apps/api-gateway` — Express API. Handles auth, workflow CRUD, node/edge CRUD,
  activation/version snapshots, manual execution, webhooks, SSE, scheduler
  listing, health checks, and serves the built frontend in production.
- `apps/workflow-engine` — BullMQ worker. Consumes workflow execution jobs,
  loads frozen workflow snapshots, builds and executes DAGs, writes step records,
  handles retries/timeouts, and publishes Redis events.
- `apps/Scheduler` — Cron trigger worker. Periodically scans active workflows
  for schedule trigger nodes and enqueues executions.
- `packages/db` — Drizzle schema, migrations, and DB connection helpers.
- `packages/queue` — BullMQ producers/queues, Redis connection, and Redis
  pub/sub helpers for execution events.
- `packages/logger` — Pino logger utilities.
- `packages/shared-types` — Shared TypeScript types for snapshots, statuses,
  API responses, and SSE payloads.
- `packages/telemetry` — OpenTelemetry helpers for tracer/context propagation.
- `infra` — Dockerfiles for Render services.

## Runtime Architecture

1. The user builds a workflow in `apps/web` using the React Flow canvas.
2. The API stores workflows, nodes, and edges in PostgreSQL through Drizzle.
3. Activating a workflow creates a frozen `workflow_versions.snapshot` containing
   nodes, edges, configs, retry policies, and timeouts.
4. A manual trigger, webhook trigger, or scheduler trigger creates a
   `workflow_executions` row and enqueues a deterministic BullMQ job.
5. The workflow engine consumes the job, loads the frozen snapshot, builds a DAG,
   and executes nodes level-by-level. Nodes in the same level run in parallel.
6. The engine writes `step_executions` rows for each attempt, handles retries and
   timeouts, stores outputs/errors, and publishes lifecycle events to Redis.
7. The API streams those Redis events to the browser with Server-Sent Events.

## Main Commands

Use these from the repo root:

```bash
npm install --legacy-peer-deps
npm run dev
npm run build
npm --workspace @synchive/workflow-engine test
npm --workspace web exec tsc -- --noEmit
```

Database:

```bash
npx drizzle-kit push
```

The build should compile all apps and packages through Turborepo.

## Environment Variables

Required for real runtime:

- `DATABASE_URL` — PostgreSQL connection string.
- `REDIS_URL` — Redis/Upstash connection string.
- `JWT_SECRET` — JWT signing secret.
- `GROQ_API_KEY` — required for AI nodes.
- `RESEND_API_KEY` — required for email nodes.

Optional:

- `SLACK_WEBHOOK_URL` — default Slack webhook.
- `DISCORD_WEBHOOK_URL` — default Discord webhook.
- `HONEYCOMB_API_KEY` and `OTEL_EXPORTER_OTLP_ENDPOINT` — tracing.
- `SCHEDULER_SYNC_INTERVAL_MS` — scheduler DB sync interval.
- `VITE_API_ORIGIN` — set this when the frontend is hosted separately from the
  API, for example on Vercel.

## Deployment

Render deployment is described in `render.yaml`.

Services:

- `synchive-api` — Docker web service using `infra/Dockerfile.api`.
- `synchive-worker` — Docker worker using `infra/Dockerfile.worker`.
- `synchive-scheduler` — Docker worker using `infra/Dockerfile.scheduler`.
- `synchive-redis` — Render-managed Redis.

Important Render free-tier behavior:

- If the frontend is served by `synchive-api`, Render controls the cold-start
  screen before React loads.
- If a custom wake-up message must appear instantly, deploy the frontend
  separately as a static site and set `VITE_API_ORIGIN` to the Render API URL.

## Workflow Data Model

Core tables:

- `users`
- `workflows`
- `workflow_nodes`
- `workflow_edges`
- `workflow_versions`
- `workflow_executions`
- `step_executions`

Important design:

- Workflow edits update live node/edge tables.
- Activation increments `workflows.currentVersion` and writes an immutable
  JSON snapshot into `workflow_versions`.
- Executions reference a specific `versionId`, so later edits do not affect
  already queued/running executions.

## Node Types

Supported node types:

- `trigger` — manual, webhook, or schedule entry point.
- `action` — HTTP, email/Resend, Slack, Discord, generic passthrough.
- `ai` — Groq OpenAI-compatible chat completions.
- `condition` — evaluates a JavaScript expression against runtime data.
- `transformer` — pick, rename, merge, filter, map, or custom JS transform.
- `loop` — iterates an array and runs direct child nodes per item.
- `delay` — waits for a configured duration, capped in worker runtime.
- `webhook` — legacy alias handled like a trigger.

Keep type changes synchronized across:

- `packages/db/src/schema/enums.ts`
- `packages/shared-types/src/index.ts`
- `apps/api-gateway/src/utils/schemas.ts`
- frontend `apps/web/src/types/index.ts`
- Drizzle migrations under `packages/db/drizzle`

## Execution Details

Important files:

- DAG build/sort: `apps/workflow-engine/src/executor/dag.ts`
- Main orchestrator: `apps/workflow-engine/src/executor/workflow-executor.ts`
- Node handlers: `apps/workflow-engine/src/executor/node-executor.ts`
- Templates: `apps/workflow-engine/src/executor/template-resolver.ts`
- Conditions: `apps/workflow-engine/src/executor/condition-evaluator.ts`

Execution behavior:

- Topological sort groups nodes into execution levels.
- Nodes in the same level run with `Promise.allSettled`.
- A node failure marks the whole execution failed after its retry policy is
  exhausted.
- Every attempt creates or updates a `step_executions` record.
- Per-node `timeoutMs` is enforced with a timeout wrapper.
- Condition edges use `conditionExpression` values like `true` or `false`.
- Skipped branch nodes are persisted as `skipped`.

## Queue and Realtime

Important files:

- Queue definitions: `packages/queue/src/queues.ts`
- Job producers: `packages/queue/src/producers.ts`
- Job types: `packages/queue/src/jobs.ts`
- Redis pub/sub: `packages/queue/src/pubsub.ts`

Notes:

- Workflow jobs use deterministic IDs: `exec-{executionId}`.
- Redis pub/sub channels are scoped per execution.
- SSE endpoint is `GET /api/executions/:executionId/stream?token=...`.
- The frontend store expects execution fields inside `event.data`.

## API Notes

Important route files:

- `auth.routes.ts` — signup, login, profile, password change.
- `workflow.routes.ts` — workflows, nodes, edges, activation, manual execution.
- `webhook.routes.ts` — webhook matching, HMAC verification, deduplication.
- `execution.routes.ts` — execution list, retry, SSE stream, step list.
- `scheduler.routes.ts` — read schedule-triggered workflows and next run data.
- `health.routes.ts` — health and `/health/ping` wake endpoint.

Authentication:

- Normal requests use `Authorization: Bearer <token>`.
- SSE supports `?token=` because `EventSource` cannot set headers.

## Frontend Notes

Important files:

- Router shell: `apps/web/src/App.tsx`
- API client: `apps/web/src/lib/api.ts`
- Zustand stores: `apps/web/src/lib/store.ts`
- Workflow editor page: `apps/web/src/pages/EditorPage.tsx`
- Canvas: `apps/web/src/components/workflow/WorkflowCanvas.tsx`
- Node config: `apps/web/src/components/workflow/NodeConfigPanel.tsx`
- Live SSE hook: `apps/web/src/hooks/index.ts`

The frontend includes a backend wake notice that pings `/health/ping`. This is
most useful when frontend and backend are deployed separately.

## Current Caveats

- `npm audit --omit=dev` still reports issues that require breaking upgrades in
  OpenTelemetry, Drizzle, and node-cron. Do not run `npm audit fix --force`
  casually; handle as a dedicated upgrade pass with regression testing.
- Vite warns that the main frontend JS chunk is larger than 500 kB. This is not
  a build failure, but route-level code splitting would improve it.
- Loop behavior is implemented, but advanced nested loop semantics should be
  tested carefully before expanding it.

## Coding Rules for Future Agents

- Keep changes scoped. Do not rewrite unrelated UI or deployment files.
- Prefer existing package helpers over new utilities.
- When changing schemas or node types, update backend validation, shared types,
  frontend types, and migrations together.
- After meaningful changes, run:

```bash
npm --workspace @synchive/workflow-engine test
npm --workspace web exec tsc -- --noEmit
npm run build
```

- Do not commit generated `dist` output or generated JavaScript under `src`.
- Do not force dependency upgrades unless explicitly requested.
