import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Mic, Shield, X, Check } from 'lucide-react'
import { requestNotificationPermission, startNotificationScheduler } from '@utils/notification-service'
const PERM_KEY = 'manasitra_permissions_asked'

export const PermissionDialog = ({ onDone }) => {
  const [step, setStep] = useState('intro') // intro | asking | done
  const [micGranted, setMicGranted] = useState(false)
  const [notifGranted, setNotifGranted] = useState(false)

  const requestAll = async () => {
    setStep('asking')

    // 1. Mic
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(t => t.stop())
      setMicGranted(true)
    } catch { setMicGranted(false) }

    // 2. Notification
    const granted = await requestNotificationPermission()
    setNotifGranted(granted)
    if (granted) startNotificationScheduler()

    localStorage.setItem(PERM_KEY, 'true')
    setStep('done')
  }

  const skip = () => {
    localStorage.setItem(PERM_KEY, 'true')
    onDone()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          padding: '0 0 0 0',
        }}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            width: '100%', maxWidth: 480,
            background: 'var(--bg)',
            borderRadius: '24px 24px 0 0',
            padding: '28px 24px 40px',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.2)',
          }}
        >
          {/* Handle bar */}
          <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--border)', margin: '0 auto 24px' }}/>

          {step === 'intro' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {/* Logo area */}
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: 'var(--primary-soft)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <Shield size={28} style={{ color: 'var(--primary)' }}/>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
                  2 permissions chahiye
                </h2>
                <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
                  Manasitra ko better experience dene ke liye
                </p>
              </div>

              {/* Permission cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {/* Mic */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 16px', borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(74,124,111,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mic size={20} style={{ color: 'var(--primary)' }}/>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>Microphone</p>
                    <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.55 }}>
                      Voice se message bhejne ke liye. Kabhi bhi band kar sakte ho.
                    </p>
                  </div>
                </div>

                {/* Notification */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 16px', borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(126,186,168,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Bell size={20} style={{ color: 'var(--secondary)' }}/>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>Notifications</p>
                    <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.55 }}>
                      Exam reminders aur har 15 min mein motivational message. Exam dates save karo aur hum yaad dilayenge!
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy note */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '10px 14px', borderRadius: 12, background: 'rgba(74,124,111,0.06)', border: '1px solid rgba(74,124,111,0.15)', marginBottom: 20 }}>
                <Shield size={13} style={{ color: 'var(--primary)', flexShrink: 0 }}/>
                <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>
                  Koi data server pe nahi jaata. Sab kuch sirf tumhare phone pe rehta hai.
                </p>
              </div>

              {/* Buttons */}
              <button onClick={requestAll}
                style={{ width: '100%', padding: '15px', borderRadius: 16, border: 'none', background: 'var(--primary)', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 10, boxShadow: '0 4px 16px var(--primary-glow)' }}
              >
                Allow Karo
              </button>
              <button onClick={skip}
                style={{ width: '100%', padding: '12px', borderRadius: 16, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-3)', fontSize: 14, cursor: 'pointer' }}
              >
                Abhi Nahi
              </button>
            </motion.div>
          )}

          {step === 'asking' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', border: '3px solid var(--primary)', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px' }}/>
              <p style={{ fontSize: 15, color: 'var(--text-2)' }}>Permission le rahe hain...</p>
              <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 6 }}>Phone pe jo dialog aaye, Allow karo</p>
            </motion.div>
          )}

          {step === 'done' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '10px 0 10px' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--primary-soft)', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Check size={28} style={{ color: 'var(--primary)' }}/>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
                Sab set hai!
              </h3>

              {/* Results */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24, textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, background: micGranted ? 'rgba(74,124,111,0.08)' : 'rgba(0,0,0,0.04)', border: `1px solid ${micGranted ? 'rgba(74,124,111,0.2)' : 'var(--border)'}` }}>
                  <Mic size={16} style={{ color: micGranted ? 'var(--primary)' : 'var(--text-3)' }}/>
                  <span style={{ fontSize: 13, color: micGranted ? 'var(--primary)' : 'var(--text-3)', fontWeight: 500 }}>
                    Microphone — {micGranted ? 'Allow ✓' : 'Denied'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, background: notifGranted ? 'rgba(126,186,168,0.08)' : 'rgba(0,0,0,0.04)', border: `1px solid ${notifGranted ? 'rgba(126,186,168,0.2)' : 'var(--border)'}` }}>
                  <Bell size={16} style={{ color: notifGranted ? 'var(--secondary)' : 'var(--text-3)' }}/>
                  <span style={{ fontSize: 13, color: notifGranted ? 'var(--secondary)' : 'var(--text-3)', fontWeight: 500 }}>
                    Notifications — {notifGranted ? 'Allow ✓' : 'Denied'}
                  </span>
                </div>
              </div>

              {notifGranted && (
                <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 20, lineHeight: 1.6 }}>
                  Exam dates Dashboard mein save karo — hum har 15 min mein yaad dilayenge!
                </p>
              )}

              <button onClick={onDone}
                style={{ width: '100%', padding: '15px', borderRadius: 16, border: 'none', background: 'var(--primary)', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 4px 16px var(--primary-glow)' }}
              >
                Chalo Shuru Karte Hain!
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Helper — should we show the dialog?
export const shouldShowPermissionDialog = () => {
  return localStorage.getItem('manasitra_permissions_asked') !== 'true'
}
