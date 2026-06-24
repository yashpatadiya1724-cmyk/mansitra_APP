import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MessageCircle, BarChart2, Smile, Gamepad2, Settings, Leaf, Mic } from 'lucide-react'
import { QuickExit } from '@components/quick-exit/quick-exit'
import { useSafetyStore } from '@store/safety-store'
import { CrisisScreen } from '@features/crisis-support/components/crisis-screen'
import { motion } from 'framer-motion'
import { useSessionStore } from '@store/session-store'
import { MansitraLogo } from '@components/logo'

// 4 tabs on sides + 1 center Voice FAB
const LEFT_NAV  = [
  { to: '/chat',      icon: MessageCircle, key: 'chat' },
  { to: '/mood',      icon: Smile,         key: 'mood' },
]

const RIGHT_NAV = [
  { to: '/games',     icon: Gamepad2,      key: 'games' },
  { to: '/settings',  icon: Settings,      key: 'settings' },
]

const SIDEBAR_NAV = [
  { to: '/chat',      icon: MessageCircle, key: 'chat' },
  { to: '/mood',      icon: Smile,         key: 'mood' },
  { to: '/dashboard', icon: BarChart2,     key: 'dashboard' },
  { to: '/garden',    icon: Leaf,          key: 'garden' },
  { to: '/games',     icon: Gamepad2,      key: 'games' },
  { to: '/voice',     icon: Mic,           key: 'voice' },
  { to: '/settings',  icon: Settings,      key: 'settings' },
]

export const MainLayout = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const crisisVisible = useSafetyStore(state => state.crisisVisible)
  const clearSession = useSessionStore(state => state.clearSession)

  // hide bottom tabs on standalone game screens for focus
  const isGameRoute = location.pathname.includes('/games/') && location.pathname !== '/games'
  const isVoiceRoute = location.pathname === '/voice'
  const isSettingsSub = location.pathname.includes('/settings/') && location.pathname !== '/settings'
  const hideBottomNav = isGameRoute || isVoiceRoute || isSettingsSub

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex' }}>
      <QuickExit />
      {crisisVisible && <CrisisScreen />}

      {/* ── Desktop Sidebar ── */}
      <aside style={{
        display: 'none', width: 240, flexShrink: 0, flexDirection: 'column',
        borderRight: '1px solid var(--border)', background: 'var(--surface)',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', zIndex: 10,
      }} className="desktop-sidebar">
        <div style={{ padding: '28px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <MansitraLogo size={40} />
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, color: 'var(--primary)' }}>Mansitra</p>
              <p style={{ fontSize: 11, color: 'var(--text-3)' }}>Mann Ka Mitra</p>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '0 12px' }} role="navigation" aria-label={t('a11y.menu')}>
          {SIDEBAR_NAV.map(({ to, icon: Icon, key }) => (
            <NavLink key={to} to={to}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 12px', borderRadius: 12, marginBottom: 4,
                textDecoration: 'none', transition: 'all 0.15s',
                background: isActive ? 'var(--primary-soft)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-2)',
                fontWeight: isActive ? 600 : 400,
                border: isActive ? '1px solid var(--border-2)' : '1px solid transparent',
              })}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span style={{ fontSize: 14 }}>{t(`nav.${key}`)}</span>
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: 10, color: 'var(--text-3)' }}>Private · Anonymous · Safe</p>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        <main id="main-content" style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{ minHeight: '100%' }}
          >
            <Outlet />
          </motion.div>
        </main>

        {/* ── Mobile Bottom Nav ── */}
        <nav className="mobile-nav nav-bar" role="navigation" aria-label={t('a11y.menu')}>
          <div style={{
            display: 'flex', alignItems: 'center',
            maxWidth: 600, margin: '0 auto',
            padding: '4px 8px',
            position: 'relative',
          }}>

            {/* Left 2 tabs */}
            {LEFT_NAV.map(({ to, icon: Icon, key }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                style={{ flex: 1 }}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{t(`nav.${key}`)}</span>
              </NavLink>
            ))}

            {/* Center Voice FAB */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/voice')}
                style={{
                  width: 56, height: 56,
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  background: isVoice
                    ? '#7C3AED'
                    : 'var(--primary)',
                  color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'none',
                  marginTop: -16, // lift above nav bar
                  position: 'relative', zIndex: 2,
                  transition: 'all 0.2s',
                }}
                aria-label="Voice Assistant"
              >
                <Mic size={22} strokeWidth={2} />
              </motion.button>
            </div>

            {/* Right 2 tabs */}
            {RIGHT_NAV.map(({ to, icon: Icon, key }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                style={{ flex: 1 }}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{t(`nav.${key}`)}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
