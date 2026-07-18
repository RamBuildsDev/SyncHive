import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store'
import styles from './AuthPage.module.css'

export function LoginPage() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await authApi.login({ email, password })
      if (res.success && res.data) {
        setAuth(res.data.token, res.data.user)
        navigate('/workflows')
      } else {
        setError(res.error ?? 'Invalid credentials')
      }
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })
        ?.response?.data?.error
      setError(msg ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logoArea}>
          <img className={styles.logoIcon} src="/brand/synchive-icon.svg" alt="" draggable={false} />
          <span className={styles.logoName}>SyncHive</span>
          <span className={styles.logoSub}>Sign in to your workspace</span>
        </div>

        {error && <div className={styles.errorBox}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email address</label>
            <input
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.passwordField}>
              <input
                className={`${styles.input} ${styles.passwordInput}`}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                className={styles.passwordToggle}
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className={styles.footer}>
          Don't have an account?{' '}
          <Link to="/signup" className={styles.link}>Create one free</Link>
        </p>
      </div>
    </div>
  )
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6A3 3 0 0012 15a3 3 0 002.4-4.8" />
      <path d="M9.9 5.2A10.4 10.4 0 0112 5c6.5 0 10 7 10 7a18.5 18.5 0 01-3.1 4.1" />
      <path d="M6.6 6.7C3.7 8.7 2 12 2 12s3.5 7 10 7a10.9 10.9 0 005.1-1.2" />
    </svg>
  )
}
