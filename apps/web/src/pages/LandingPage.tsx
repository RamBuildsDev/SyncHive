import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/lib/store'
import s from './LandingPage.module.css'

const WORKFLOW_ICONS = {
  database: '/workflow-icons/Database.png',
  email: '/workflow-icons/Email.png',
  event: '/workflow-icons/Events.png',
  http: '/workflow-icons/HTTP-Request.png',
  schedule: '/workflow-icons/Schedule.png',
  function: '/workflow-icons/function.png',
  hubspot: '/workflow-icons/hubspot.png',
  webhook: '/workflow-icons/webhook.png',
  premium: '/workflow-icons/Is-Premium.png',
}

export function LandingPage() {
  const navigate = useNavigate()
  const { token } = useAuthStore()
  const ctaLabel = token ? 'Open Dashboard' : 'Get started free'
  const ctaRoute = token ? '/workflows' : '/signup'

  return (
    <div className={s.page}>
      <div className={s.orb1} />
      <div className={s.orb2} />
      <div className={s.orb3} />
      <div className={s.gridGlow} />

      {/* ── NAV ── */}
      <nav className={s.nav}>
        <div className={s.navLogo}>
          <img className={s.brandIcon} src="/brand/synchive-icon.svg" alt="" draggable={false} />
          <span className={s.brand}>SyncHive</span>
          <span className={s.tag}>Engine</span>
        </div>
        <div className={s.navLinks}>
          <a className={s.navLink} href="#features">Features</a>
          <a className={s.navLink} href="#how">How it works</a>
          <a className={s.navLink} href="#execution">Templates</a>
          <a className={s.navLink} href="#features">Pricing</a>
          <a className={s.navLink} href="#how">Docs</a>
          <a className={s.navLink} href="#execution">Changelog</a>
          <a className={s.navLink} href="https://github.com/RamBuildsDev/SyncHive" target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <div className={s.navRight}>
          <button className={s.signIn} onClick={() => navigate('/login')}>Log in</button>
          <button className={s.cta} onClick={() => navigate(ctaRoute)}>{ctaLabel} <ArrowIcon /></button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className={s.hero}>
        <div className={s.heroShell}>
          <div className={s.heroCopy}>
            <div className={s.heroBadge}>
              <span className={s.badgeDot} />
              Workflow automation for engineers
            </div>
            <h1 className={s.heroTitle}>
              <span className={s.heroTitleLine}>Automate everything.</span><br />
              <span className={s.heroRed}>Ship anywhere.</span>
            </h1>
            <p className={s.heroSub}>
              Design, build, and deploy powerful workflows that integrate your tools, move data, and run exactly how you need.
            </p>
            <div className={s.heroBtns}>
              <button className={s.heroPrimary} onClick={() => navigate(ctaRoute)}>
                {ctaLabel} <ArrowIcon />
              </button>
              <a className={s.heroSecondary} href="#features">
                <PlayIcon /> Watch demo
              </a>
            </div>
            <div className={s.heroChecks}>
              {['No credit card required', 'Setup in minutes', 'Cancel anytime'].map((item) => (
                <span key={item}><CheckIcon /> {item}</span>
              ))}
            </div>
          </div>

          <div className={s.heroVisual}>
            <div className={s.appOrbit} aria-hidden="true">
              {[
                ['webhook', 'Webhook', 'webhook.png', s.appWebhook],
                ['slack', 'Slack', 'slack.png', s.appSlack],
                ['github', 'GitHub', 'github.png', s.appGithub],
                ['gmail', 'Gmail', 'gmail.png', s.appGmail],
                ['postgres', 'Postgres', 'postgre.png', s.appPostgres],
                ['openai', 'ChatGPT', 'chatgpt.png', s.appOpenai],
                ['hubspot', 'HubSpot', 'hubspot.png', s.appHubspot],
                ['drive', 'Google Drive', 'google-drive.png', s.appDrive],
                ['notion', 'Notion', 'Notion.png', s.appNotion],
              ].map(([key, label, file, cls]) => (
                <span key={key} className={`${s.appIcon} ${cls}`} title={label}>
                  <img src={`/Icons/${file}`} alt="" loading="eager" draggable={false} />
                </span>
              ))}
            </div>
            <div className={s.productPreview} aria-label="Workflow editor preview">
              <div className={s.previewSidebar}>
                <div className={s.previewBrand}>
                  <img className={s.previewLogo} src="/brand/synchive-icon.svg" alt="" draggable={false} />
                  <span>SyncHive</span>
                </div>
                {['Overview', 'Workflows', 'Executions', 'Schedules', 'Credentials', 'Settings'].map((item, index) => (
                  <span key={item} className={index === 1 ? s.previewNavActive : s.previewNav}>{item}</span>
                ))}
              </div>
              <div className={s.previewMain}>
                <div className={s.previewTopbar}>
                  <div>
                    <span className={s.previewCrumb}>Workflows /</span>
                    <strong>Customer Onboarding</strong>
                    <span className={s.activePill}>Active</span>
                  </div>
                  <div className={s.previewActions}>
                    <span>Save</span>
                    <button>Run</button>
                    <button className={s.deployBtn}>Deploy</button>
                  </div>
                </div>
                <div className={s.previewCanvas}>
                  <div className={s.nodePalette}>
                    <span className={s.paletteTitle}>Nodes</span>
                    <span className={s.paletteSearch}>Search nodes...</span>
                    <span className={s.paletteGroup}>Triggers</span>
                    <PaletteRow icon={WORKFLOW_ICONS.webhook} label="Webhook" />
                    <PaletteRow icon={WORKFLOW_ICONS.schedule} label="Schedule" />
                    <PaletteRow icon={WORKFLOW_ICONS.event} label="Event" />
                    <span className={s.paletteGroup}>Actions</span>
                    <PaletteRow icon={WORKFLOW_ICONS.http} label="HTTP Request" />
                    <PaletteRow icon={WORKFLOW_ICONS.function} label="Function" />
                    <PaletteRow icon={WORKFLOW_ICONS.database} label="Database" />
                    <PaletteRow icon={WORKFLOW_ICONS.email} label="Email" />
                  </div>
                  <div className={s.workflowTrack}>
                    <svg className={s.flowSvg} viewBox="0 0 700 486" aria-hidden="true">
                      <path d="M174 115 L208 115" />
                      <path d="M340 115 L374 115" />
                      <path d="M440 148 C440 178 392 180 392 210" />
                      <path d="M465 239 C506 238 490 184 530 184" />
                      <path d="M465 239 C510 248 486 288 530 288" />
                      <path d="M320 239 C260 286 300 382 440 382" />
                      {[
                        [174, 115], [208, 115], [340, 115], [374, 115],
                        [440, 148], [392, 210], [465, 239], [530, 184],
                        [530, 288], [320, 239], [440, 382],
                      ].map(([cx, cy]) => (
                        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.2" />
                      ))}
                    </svg>
                    <span className={`${s.flowLabel} ${s.flowTrueOne}`}>True</span>
                    <span className={`${s.flowLabel} ${s.flowTrueTwo}`}>True</span>
                    <span className={`${s.flowLabel} ${s.flowFalse}`}>False</span>
                    <PreviewNode className={s.nodeWebhook} icon={WORKFLOW_ICONS.webhook} title="Webhook" meta="POST /signup" />
                    <PreviewNode className={s.nodeValidate} icon={WORKFLOW_ICONS.function} title="Validate Data" meta="Function" />
                    <PreviewNode className={s.nodeCreate} icon={WORKFLOW_ICONS.http} title="Create User" meta="HTTP Request" />
                    <PreviewNode className={s.nodeCondition} icon={WORKFLOW_ICONS.premium} title="Is Premium?" meta="If / Else" />
                    <PreviewNode className={s.nodeEmail} icon={WORKFLOW_ICONS.email} title="Send Email" meta="SMTP" />
                    <PreviewNode className={s.nodeWelcome} icon={WORKFLOW_ICONS.email} title="Send Welcome" meta="Email" />
                    <PreviewNode className={s.nodeCrm} icon={WORKFLOW_ICONS.hubspot} title="Add to CRM" meta="HubSpot" />
                    <div className={s.canvasTools} aria-hidden="true">
                      <div className={s.toolPair}>
                        <span>↖</span>
                        <span>✋</span>
                      </div>
                      <div className={s.zoomTools}>
                        <span>−</span>
                        <strong>100%</strong>
                        <span>+</span>
                      </div>
                      <span className={s.fullscreenTool}>⛶</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={s.heroStats}>
          {[
            { num: 'Unlimited', title: 'Workflows', label: 'No workflow ceiling' },
            { num: '<200ms', title: 'Low Latency', label: 'Fast execution' },
            { num: '99.99%', title: 'Reliability', label: 'Enterprise grade' },
            { num: '100+', title: 'Node Types', label: 'And growing' },
          ].map((item, index) => (
            <div key={item.title} className={s.heroStatGroup}>
              <span className={s.statIcon}>{index === 0 ? '∞' : index === 1 ? '↯' : index === 2 ? '◇' : '▦'}</span>
              <div className={s.heroStat}>
                <span className={s.heroStatNum}>{item.num}</span>
                <span className={s.heroStatTitle}>{item.title}</span>
                <span className={s.heroStatLabel}>{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={s.trustLine}>Trusted by engineers building mission-critical automations</div>
      </section>

      <section className={s.featureStrip} aria-label="Product highlights">
        {[
          ['Visual workflow builder', 'Drag, drop, and connect nodes to build automations in minutes.'],
          ['Real-time executions', 'Monitor every run with detailed logs and step-by-step views.'],
          ['Connect everything', 'Integrate tools, APIs, webhooks, queues, and data sources.'],
          ['Enterprise ready', 'Reliable execution with snapshots, retries, timeouts, and audit history.'],
        ].map(([title, desc], index) => (
          <div key={title} className={s.stripItem}>
            <span className={s.stripIcon}>{index + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          </div>
        ))}
      </section>



      {/* ── FEATURES ── */}
      <section className={`${s.section} ${s.featuresSection}`} id="features">
        <div className={s.featureIntro}>
          <div className={s.sectionBadge}>Features</div>
          <h2 className={s.sectionTitle}>Everything you need to automate</h2>
          <p className={s.sectionSub}>Built for engineers who want control — not drag-and-drop limitations with hidden costs.</p>
          <div className={s.featureArt} aria-hidden="true">
            <img
              className={s.featureIllustration}
              src="/features/workflow-automation.png"
              alt=""
              loading="eager"
              draggable={false}
            />
          </div>
        </div>
        <div className={s.featGrid}>
          {FEATURES.map((f, i) => (
            <div key={i} className={s.featCard}>
              <div className={s.featIconWrap}>{f.icon}</div>
              <h3 className={s.featTitle}>{f.title}</h3>
              <p className={s.featDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className={s.section} id="how">
        <div className={s.sectionBadge}>How it works</div>
        <h2 className={s.sectionTitle}>From idea to automation in minutes</h2>
        <p className={s.sectionSub}>No infrastructure setup. No complex configs. Just build and deploy.</p>
        <div className={s.stepsGrid}>
          {STEPS.map((step, i) => (
            <div key={i} className={s.stepCard}>
              <div className={s.stepNum}>{String(i + 1).padStart(2, '0')}</div>
              <h3 className={s.stepTitle}>{step.title}</h3>
              <p className={s.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXECUTION FLOW ── */}
      <section className={s.section} id="execution">
        <div className={s.sectionBadge}>Execution Model</div>
        <h2 className={s.sectionTitle}>How a webhook becomes a workflow</h2>
        <div className={s.flowRow}>
          {FLOW.map((step, i) => (
            <div key={i} className={s.flowItem}>
              <div className={s.flowCard}>
                <div className={s.flowIcon}>{step.icon}</div>
                <div className={s.flowTitle}>{step.title}</div>
                <div className={s.flowDesc}>{step.desc}</div>
              </div>
              {i < FLOW.length - 1 && (
                <div className={s.flowConnector}>
                  <div className={s.flowLine} />
                  <div className={s.flowArrowHead} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className={s.ctaSection}>
        <div className={s.ctaCard}>
          <div className={s.ctaGlow} />
          <div className={s.ctaContent}>
            <h2 className={s.ctaTitle}>Ready to automate everything?</h2>
            <p className={s.ctaSub}>Deploy in minutes. Scale without limits. No vendor lock-in.</p>
            <div className={s.ctaBtns}>
              <button className={s.heroPrimary} onClick={() => navigate(ctaRoute)}>
                {ctaLabel} <ArrowIcon />
              </button>
              <a className={s.heroSecondary} href="https://github.com/RamBuildsDev/SyncHive" target="_blank" rel="noreferrer">
                <GithubIcon /> Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={s.footer}>
        <div className={s.footerTop}>
          <div className={s.footerBrand}>
            <img className={s.footerBrandIcon} src="/brand/synchive-icon.svg" alt="" draggable={false} />
            <span className={s.footerName}>SyncHive</span>
          </div>
          <div className={s.footerLinks}>
            <a className={s.footerLink} href="#features">Features</a>
            <a className={s.footerLink} href="#how">How it works</a>
            <a className={s.footerLink} href="#execution">Execution</a>
            <a className={s.footerLink} href="https://github.com/RamBuildsDev/SyncHive" target="_blank" rel="noreferrer">GitHub</a>
            <span className={s.footerLink} style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Sign in</span>
          </div>
        </div>
        <div className={s.footerBottom}>
          <span className={s.footerCopy}>© 2025 SyncHive. All rights reserved.</span>
          <span className={s.footerBuilt}>Built with TypeScript · Node.js · PostgreSQL · BullMQ</span>
        </div>
      </footer>
    </div>
  )
}


const FEATURES = [
  {
    title: 'Visual DAG Editor',
    desc: 'Drag, drop, and connect nodes on a canvas powered by React Flow. Your workflow topology is always visible.',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="1" width="6" height="6" rx="1.5" /><rect x="13" y="1" width="6" height="6" rx="1.5" /><rect x="7" y="13" width="6" height="6" rx="1.5" /><path d="M4 7v2.5a2.5 2.5 0 002.5 2.5H8.5M16 7v2.5a2.5 2.5 0 01-2.5 2.5H11.5" /></svg>,
  },
  {
    title: 'BullMQ Powered Queue',
    desc: 'Every execution is a reliable BullMQ job — dead-letter queues, deterministic job IDs, and automatic deduplication.',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2L3 6v8l7 4 7-4V6L10 2z" /><path d="M10 2v14M3 6l7 4 7-4" /></svg>,
  },
  {
    title: 'Per-node Retry Policies',
    desc: 'Each node has its own maxRetries, backoffMs, and multiplier. AI calls retry 3x. Webhooks never retry.',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5A7 7 0 104 16M15 5v4h-4" /></svg>,
  },
  {
    title: 'Parallel Execution',
    desc: 'DAG levels run in parallel using Promise.allSettled. Independent branches never block each other.',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3v14M4 8l6-5 6 5M4 12l6 5 6-5" /></svg>,
  },
  {
    title: 'Version Snapshots',
    desc: 'Activating freezes the graph. Edit a live workflow without breaking running executions — ever.',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="7" /><path d="M10 6v4l3 3" /></svg>,
  },
  {
    title: 'Webhook Triggers',
    desc: 'Expose endpoints instantly. API returns 202 immediately, executes async. GitHub, Stripe, Slack — anything.',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2C6 2 3 5 3 9s3 7 7 7 7-3 7-7M14 2l3 2-2 3" /></svg>,
  },
  {
    title: 'Mustache Templates',
    desc: 'Reference upstream node outputs with {{sender.login}} syntax — dot notation, recursive config resolution.',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7l-2 3 2 3M16 7l2 3-2 3M8 4l-2 12M14 4l-2 12" /></svg>,
  },
  {
    title: 'Condition Evaluator',
    desc: 'Branch your DAG based on runtime expressions. Evaluate node output, skip paths, handle errors gracefully.',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12M10 4l4 6-4 6M6 4L2 10l4 6" /></svg>,
  },
  {
    title: 'Audit Trail',
    desc: 'Every retry is a new row. Failed rows are never mutated. Full execution history always preserved.',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h14M3 9h10M3 13h7M3 17h5" /></svg>,
  },
]

const STEPS = [
  { title: 'Create a workflow', desc: 'Name it, pick a trigger — webhook, schedule, manual, or event. Done in under 10 seconds.' },
  { title: 'Build the DAG', desc: 'Add nodes, connect them visually. Trigger → Action → AI → Condition → Transformer.' },
  { title: 'Activate', desc: 'Validates the DAG and creates a frozen version snapshot. Your workflow goes live instantly.' },
  { title: 'Monitor live', desc: 'Every execution logged in real time — status, duration, retries, errors, step outputs.' },
]

const FLOW = [
  {
    title: 'Webhook fires',
    desc: 'External service hits /hooks/:path',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2C5.7 2 3 4.7 3 8s2.7 6 6 6 6-2.7 6-6M12 2l3 1.5-1.5 2.5" /></svg>,
  },
  {
    title: 'API returns 202',
    desc: 'Immediate response, async execution',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l4 4 8-8" /></svg>,
  },
  {
    title: 'BullMQ job queued',
    desc: 'Deterministic ID prevents duplicates',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2L2 6v6l7 4 7-4V6L9 2z" /></svg>,
  },
  {
    title: 'Engine picks up',
    desc: 'Loads snapshot, builds DAG',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="3" /><path d="M9 2v2M9 14v2M2 9h2M14 9h2" /></svg>,
  },
  {
    title: 'Nodes execute',
    desc: 'Parallel branches, retries, timeouts',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9l3 3 5-5" /><circle cx="9" cy="9" r="7" /></svg>,
  },
  {
    title: 'Logged & done',
    desc: 'Every step recorded, audit trail kept',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h12M3 9h8M3 13h5" /></svg>,
  },
]

function ArrowIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
}
function GithubIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
}

function PaletteRow({ icon, label }: { icon: string; label: string }) {
  return (
    <span className={s.paletteItem}>
      <img src={icon} alt="" loading="eager" draggable={false} />
      {label}
    </span>
  )
}

function PreviewNode({ className, icon, title, meta }: {
  className: string
  icon: string
  title: string
  meta: string
}) {
  return (
    <div className={`${s.previewNode} ${className}`}>
      <span className={s.nodeIcon}>
        <img src={icon} alt="" loading="eager" draggable={false} />
      </span>
      <div>
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
    </div>
  )
}
function PlayIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6.2" /><path d="M6.7 5.6l4 2.4-4 2.4V5.6z" fill="currentColor" stroke="none" /></svg>
}
function CheckIcon() {
  return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="7.5" r="6" /><path d="M4.5 7.7l2 2 4-4" /></svg>
}
