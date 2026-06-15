import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useThemeStore } from '@store/theme-store'
import { useLanguageStore } from '@store/language-store'
import { SUPPORTED_LANGUAGES, APP_VERSION, STORAGE_KEYS } from '@/app/config/constants'
import { Sun, Moon, Monitor, Shield, Info, Flag, ChevronRight, Globe, Palette, Settings, RefreshCw, Smartphone, Lock, Bell, BellOff, Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'
import { ReportModal } from './components/report-modal'
import { AboutModal } from './components/about-modal'
import { requestNotificationPermission, startNotificationScheduler, stopNotificationScheduler, sendTestNotification } from '@utils/notification-service'

const ThemeBtn = ({ value, current, icon: Icon, label, onClick }) => (
  <button onClick={() => onClick(value)}
    style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      padding: '13px 8px', borderRadius: 12, cursor: 'pointer',
      border: `2px solid ${current === value ? 'var(--primary)' : 'var(--border)'}`,
      background: current === value ? 'var(--primary-soft)' : 'rgba(255,255,255,0.02)',
      color: current === value ? 'var(--primary)' : 'var(--text-2)',
      transition: 'all 0.15s', minHeight: 64,
    }}
  >
    <Icon size={18} />
    <span style={{ fontSize: 12, fontWeight: 500 }}>{label}</span>
  </button>
)

const Row = ({ icon: Icon, label, sub, onClick, danger, badge }) => (
  <button onClick={onClick}
    style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 0', background: 'none', border: 'none', cursor: 'pointer',
      borderBottom: '1px solid var(--border)', textAlign: 'left', minHeight: 56,
    }}
  >
    <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: danger ? 'rgba(232,112,144,0.10)' : 'var(--primary-soft)' }}>
      <Icon size={16} style={{ color: danger ? 'var(--danger)' : 'var(--primary)' }} />
    </div>
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: 14, fontWeight: 500, color: danger ? 'var(--danger)' : 'var(--text)' }}>{label}</p>
      {sub && <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 1 }}>{sub}</p>}
    </div>
    {badge && (
      <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: 'rgba(93,214,160,0.12)', color: 'var(--success)', fontWeight: 600, marginRight: 4 }}>
        {badge}
      </span>
    )}
    <ChevronRight size={15} style={{ color: 'var(--text-3)' }} />
  </button>
)

export const SettingsPage = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { theme, setTheme } = useThemeStore()
  const { selectedLanguage, setLanguage, unlockLanguage } = useLanguageStore()
  const [reportOpen, setReportOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [notifEnabled, setNotifEnabled] = useState(
    localStorage.getItem('manasitra_notif_granted') === 'true'
  )
  const [ttsEnabled, setTtsEnabled] = useState(
    localStorage.getItem('manasitra_tts_enabled') !== 'false'
  )

  const toggleTTS = () => {
    const next = !ttsEnabled
    setTtsEnabled(next)
    localStorage.setItem('manasitra_tts_enabled', String(next))
  }

  const toggleNotifications = async () => {
    if (notifEnabled) {
      stopNotificationScheduler()
      localStorage.setItem('manasitra_notif_granted', 'false')
      setNotifEnabled(false)
    } else {
      const granted = await requestNotificationPermission()
      if (granted) {
        startNotificationScheduler()
        setNotifEnabled(true)
      }
    }
  }
  const [sharedDevice, setSharedDevice] = useState(
    localStorage.getItem(STORAGE_KEYS.SHARED_DEVICE) === 'true'
  )

  const toggleSharedDevice = () => {
    const next = !sharedDevice
    setSharedDevice(next)
    localStorage.setItem(STORAGE_KEYS.SHARED_DEVICE, String(next))
  }

  const changeLang = code => { unlockLanguage(); setLanguage(code); i18n.changeLanguage(code) }

  return (
    <div className="app-shell">
      <div className="page-wrap">

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--primary-soft)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Settings size={20} style={{ color: 'var(--primary)' }} />
            </div>
            <h1 className="page-title" style={{ marginBottom: 0 }}>{t('settings.title')}</h1>
          </div>
          <p className="page-subtitle">Customize your Manasitra experience</p>
        </div>

        {/* Language */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Globe size={15} style={{ color: 'var(--primary)' }} />
            <p className="section-label" style={{ marginBottom: 0 }}>{t('settings.language')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, maxHeight: 280, overflowY: 'auto' }}>
            {SUPPORTED_LANGUAGES.map(l => (
              <button key={l.code} onClick={() => changeLang(l.code)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                  padding: '14px 8px', borderRadius: 12, cursor: 'pointer',
                  border: `2px solid ${selectedLanguage === l.code ? 'var(--primary)' : 'var(--border)'}`,
                  background: selectedLanguage === l.code ? 'var(--primary-soft)' : 'rgba(255,255,255,0.02)',
                  transition: 'all 0.15s', minHeight: 68,
                }}
              >
                <span style={{ fontSize: 17, fontWeight: 700, color: selectedLanguage === l.code ? 'var(--primary)' : 'var(--text)' }}>{l.nativeName}</span>
                <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{l.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Theme */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Palette size={15} style={{ color: 'var(--primary)' }} />
            <p className="section-label" style={{ marginBottom: 0 }}>{t('settings.theme')}</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <ThemeBtn value="dark"  current={theme} icon={Moon}    label={t('settings.theme_dark')}  onClick={setTheme} />
            <ThemeBtn value="light" current={theme} icon={Sun}     label={t('settings.theme_light')} onClick={setTheme} />
            <ThemeBtn value="auto"  current={theme} icon={Monitor} label={t('settings.theme_auto')}  onClick={setTheme} />
          </div>
        </motion.div>

        {/* Shared device mode */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="glass-card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: sharedDevice ? 'rgba(240,184,96,0.12)' : 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Smartphone size={17} style={{ color: sharedDevice ? 'var(--warning)' : 'var(--primary)' }} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Shared Device Mode</p>
                <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 1 }}>
                  {sharedDevice ? 'On — mood log hidden, chat clears on close' : 'Off — normal privacy mode'}
                </p>
              </div>
            </div>
            {/* Toggle switch */}
            <button onClick={toggleSharedDevice} aria-label="Toggle shared device mode"
              style={{
                width: 48, height: 26, borderRadius: 999, border: 'none', cursor: 'pointer',
                background: sharedDevice ? 'var(--warning)' : 'var(--border)',
                position: 'relative', transition: 'background 0.2s', flexShrink: 0,
              }}
            >
              <motion.div animate={{ x: sharedDevice ? 22 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{ position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
              />
            </button>
          </div>
          {sharedDevice && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              style={{ marginTop: 12, padding: '10px 12px', borderRadius: 10, background: 'rgba(240,184,96,0.07)', border: '1px solid rgba(240,184,96,0.2)' }}
            >
              <p style={{ fontSize: 12, color: 'var(--warning)', lineHeight: 1.6 }}>
                🔒 Shared device mode is active. Mood history is hidden from the home screen and chat history clears when you close the tab.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.09 }} className="glass-card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: notifEnabled ? 'var(--primary-soft)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {notifEnabled
                  ? <Bell size={17} style={{ color: 'var(--primary)' }}/>
                  : <BellOff size={17} style={{ color: 'var(--text-3)' }}/>
                }
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Exam Notifications</p>
                <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 1 }}>
                  {notifEnabled ? 'On — motivational reminders every 15 min' : 'Off — tap to enable'}
                </p>
              </div>
            </div>
            <button onClick={toggleNotifications} aria-label="Toggle notifications"
              style={{
                width: 48, height: 26, borderRadius: 999, border: 'none', cursor: 'pointer',
                background: notifEnabled ? 'var(--primary)' : 'var(--border)',
                position: 'relative', transition: 'background 0.2s', flexShrink: 0,
              }}
            >
              <motion.div animate={{ x: notifEnabled ? 22 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{ position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
              />
            </button>
          </div>
          {notifEnabled && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              style={{ marginTop: 12, display: 'flex', gap: 8 }}
            >
              <button onClick={sendTestNotification}
                style={{ flex: 1, padding: '8px 12px', borderRadius: 10, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                <Bell size={13}/> Test Notification
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Voice Reply (TTS) */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.095 }} className="glass-card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: ttsEnabled ? 'var(--primary-soft)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {ttsEnabled
                  ? <Volume2 size={17} style={{ color: 'var(--primary)' }}/>
                  : <VolumeX size={17} style={{ color: 'var(--text-3)' }}/>
                }
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Voice Reply</p>
                <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 1 }}>
                  {ttsEnabled ? 'On — AI replies bolke sunata hai' : 'Off — silent mode'}
                </p>
              </div>
            </div>
            <button onClick={toggleTTS} aria-label="Toggle voice reply"
              style={{
                width: 48, height: 26, borderRadius: 999, border: 'none', cursor: 'pointer',
                background: ttsEnabled ? 'var(--primary)' : 'var(--border)',
                position: 'relative', transition: 'background 0.2s', flexShrink: 0,
              }}
            >
              <motion.div animate={{ x: ttsEnabled ? 22 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{ position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
              />
            </button>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card" style={{ marginBottom: 28 }}>
          <Row icon={Shield}    label={t('privacy.title')}             sub="View what's stored and delete your data"  onClick={() => navigate('/privacy')} />
          <Row icon={Flag}      label={t('settings.report_response')}  sub="Help us improve safety and quality"       onClick={() => setReportOpen(true)} badge="New" />
          <Row icon={Info}      label={t('settings.about')}            sub={`Version ${APP_VERSION} · Built with care`} onClick={() => setAboutOpen(true)} />
          <Row icon={RefreshCw} label="Redo Onboarding"                sub="Change nickname or revisit privacy info"  onClick={() => { localStorage.removeItem('manasitra_onboarded'); navigate('/onboarding', { replace: true }) }} />
          <Row icon={Flag}      label="Admin — View Reports"           sub="Review flagged responses (admin only)"    onClick={() => navigate('/admin/reports')} />
        </motion.div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 4 }}>Manasitra v{APP_VERSION}</p>
          <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>Built with care, built with purpose. 💜</p>
          <p style={{ fontSize: 11, color: 'var(--text-3)' }}>Ideathon Viksit Bharat 2047 · Silver Oak University</p>
        </div>
      </div>

      <ReportModal isOpen={reportOpen} onClose={() => setReportOpen(false)} />
      <AboutModal  isOpen={aboutOpen}  onClose={() => setAboutOpen(false)} />
    </div>
  )
}

// end of file
