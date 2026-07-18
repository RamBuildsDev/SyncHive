import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/lib/store'
import styles from './TopNav.module.css'

export function TopNav() {
  const { user, clearAuth } = useAuthStore()
  const navigate = useNavigate()

  return (
    <nav className={styles.nav}>
      <div className={styles.workspace}>
        <button className={styles.workspaceBtn}>
          <GridIcon />
          <span>SyncHive workspace</span>
          <ChevronIcon />
        </button>
      </div>

      <div className={styles.searchWrap}>
        <SearchIcon />
        <input className={styles.search} placeholder="Search workflows, runs, agents..." />
        <kbd>⌘ K</kbd>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn} title="New workflow" onClick={() => navigate('/workflows')}>
          <PlusIcon />
        </button>
        <button className={styles.iconBtn} title="Notifications">
          <BellIcon />
        </button>
        <button className={styles.iconBtn} title="Help">
          <HelpIcon />
        </button>
        {user && (
          <div className={styles.userChip}>
            <div className={styles.avatar}>{user.name[0].toUpperCase()}</div>
            <div>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userMeta}>Account</span>
            </div>
          </div>
        )}
        <button className={styles.cta} onClick={clearAuth}>Sign out</button>
      </div>
    </nav>
  )
}

function GridIcon() {
  return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="2" width="4" height="4" rx="1"/><rect x="9" y="2" width="4" height="4" rx="1"/><rect x="2" y="9" width="4" height="4" rx="1"/><rect x="9" y="9" width="4" height="4" rx="1"/></svg>
}
function SearchIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></svg>
}
function PlusIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M8 3v10M3 8h10"/></svg>
}
function BellIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6.5a4 4 0 10-8 0c0 4-1.5 4.5-1.5 4.5h11S12 10.5 12 6.5z"/><path d="M6.5 13a1.7 1.7 0 003 0"/></svg>
}
function HelpIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M6.4 6.2a1.8 1.8 0 113 1.3c-.8.5-1.2.9-1.2 1.8"/><path d="M8 12h.01"/></svg>
}
function ChevronIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5.5L7 8.5l3-3"/></svg>
}
