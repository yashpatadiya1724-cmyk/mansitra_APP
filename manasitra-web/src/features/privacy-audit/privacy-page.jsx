import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMoodStore } from '@store/mood-store'
import { useProgressStore } from '@store/progress-store'
import { useSessionStore } from '@store/session-store'
import { Shield, CheckCircle, XCircle, Trash2, Lock, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { APP_VERSION } from '@/app/config/constants'

const STORED = [
  { label:'Language preference',  detail:'Until you change it' },
  { label:'Theme preference',     detail:'Until you change it' },
  { label:'Mood log',             detail:'On your device only' },
  { label:'Check-in streak',      detail:'On your device only' },
  { label:'Daily wins',           detail:'On your device only' },
  { label:'Exam dates',           detail:'Only if you add them, on your device only' },
  { label:'Accessibility prefs',  detail:'Until you change them' },
]

const NOT_STORED = [
  'Your name or identity',
  'Email or phone number',
  'Chat messages (cleared on exit)',
  'IP address or location',
  'Device fingerprint',
  'Any biometric data',
  'Advertising identifiers',
  'Raw chat content on any server',
  'Report data (never saved locally)',
]

export const PrivacyPage = () => {
  const { t } = useTranslation()
  const { clearMoodHistory } = useMoodStore()
  const { clearProgress } = useProgressStore()
  const { clearSession } = useSessionStore()
  const [confirmed, setConfirmed] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const del = () => {
    if (!confirmed) { setConfirmed(true); return }
    clearMoodHistory(); clearProgress(); clearSession()
    localStorage.clear(); sessionStorage.clear()
    setDeleted(true); setConfirmed(false)
  }

  return (
    <div className="app-shell">
      <div className="page-wrap">

        <div style={{ marginBottom:28 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:6 }}>
            <div style={{ width:44, height:44, borderRadius:13, background:'var(--primary-soft)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Shield size={22} style={{ color:'var(--primary)' }} />
            </div>
            <h1 className="page-title" style={{ marginBottom:0 }}>{t('privacy.title')}</h1>
          </div>
          <p className="page-subtitle">Your data, your control — always</p>
        </div>

        {/* Promise */}
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
          style={{ padding:'20px 22px', borderRadius:16, marginBottom:20, background:'linear-gradient(135deg, rgba(155,143,240,0.09) 0%, rgba(98,200,185,0.06) 100%)', border:'1px solid var(--border)', display:'flex', gap:14, alignItems:'flex-start' }}
        >
          <Lock size={18} style={{ color:'var(--primary)', flexShrink:0, marginTop:2 }} />
          <p style={{ fontSize:14, color:'var(--text-2)', lineHeight:1.75, fontStyle:'italic' }}>"{t('privacy.promise')}"</p>
        </motion.div>

        {/* Stored */}
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.05 }} className="glass-card" style={{ marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
            <CheckCircle size={16} style={{ color:'var(--success)' }} />
            <p style={{ fontSize:14, fontWeight:600, color:'var(--text)' }}>{t('privacy.stored_label')}</p>
          </div>
          {STORED.map((item, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'9px 0', borderBottom: i < STORED.length-1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:'var(--success)', flexShrink:0 }} />
                <span style={{ fontSize:14, color:'var(--text)' }}>{item.label}</span>
              </div>
              <span style={{ fontSize:12, color:'var(--text-3)', flexShrink:0 }}>{item.detail}</span>
            </div>
          ))}
        </motion.div>

        {/* Not stored */}
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }} className="glass-card" style={{ marginBottom:24 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
            <EyeOff size={16} style={{ color:'var(--danger)' }} />
            <p style={{ fontSize:14, fontWeight:600, color:'var(--text)' }}>{t('privacy.not_stored_label')}</p>
          </div>
          {NOT_STORED.map((item, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom: i < NOT_STORED.length-1 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ color:'var(--danger)', fontSize:13, flexShrink:0 }}>✕</span>
              <span style={{ fontSize:14, color:'var(--text-2)' }}>{item}</span>
            </div>
          ))}
        </motion.div>

        {/* Delete */}
        {deleted ? (
          <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="glass-card" style={{ textAlign:'center', padding:'36px 24px' }}>
            <CheckCircle size={44} style={{ color:'var(--success)', margin:'0 auto 14px' }} />
            <p style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:700, marginBottom:6 }}>All data deleted.</p>
            <p style={{ fontSize:14, color:'var(--text-2)' }}>Your slate is clean. 🌱</p>
          </motion.div>
        ) : (
          <div>
            {confirmed && (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                style={{ padding:'12px 16px', borderRadius:12, marginBottom:12, background:'rgba(240,184,96,0.07)', border:'1px solid rgba(240,184,96,0.22)', fontSize:13, color:'var(--warning)', textAlign:'center' }}
              >{t('privacy.delete_confirm')}</motion.div>
            )}
            <button onClick={del}
              style={{
                width:'100%', padding:'14px', borderRadius:14, cursor:'pointer',
                border:`1px solid ${confirmed ? 'var(--danger)' : 'var(--border)'}`,
                background: confirmed ? 'rgba(232,112,144,0.10)' : 'rgba(255,255,255,0.03)',
                color: confirmed ? 'var(--danger)' : 'var(--text-2)',
                fontSize:14, fontWeight:500,
                display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                transition:'all 0.2s', minHeight:52,
              }}
            >
              <Trash2 size={16} />
              {confirmed ? 'Yes, delete everything' : t('privacy.delete_button')}
            </button>
          </div>
        )}

        <p style={{ textAlign:'center', fontSize:12, color:'var(--text-3)', marginTop:24 }}>
          {t('privacy.last_updated')}: April 2026 · v{APP_VERSION}
        </p>
      </div>
    </div>
  )
}
