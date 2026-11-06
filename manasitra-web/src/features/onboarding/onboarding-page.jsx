import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@store/language-store'
import { SUPPORTED_LANGUAGES, STORAGE_KEYS } from '@/app/config/constants'
import { Shield, Lock, Trash2, ChevronRight, Heart, Eye, EyeOff, Sparkles } from 'lucide-react'
import { MansitraLogo } from '@components/logo'

const STEPS = ['language', 'welcome', 'privacy']

const slide = {
  enter:  { opacity: 0, x: 32 },
  center: { opacity: 1, x: 0 },
  exit:   { opacity: 0, x: -32 },
}

export const OnboardingPage = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { setLanguage } = useLanguageStore()
  const [step, setStep] = useState(0)
  const [lang, setLang] = useState('en')
  const [nickname, setNickname] = useState('')

  const pick = (code) => { setLang(code); i18n.changeLanguage(code) }

  const next = () => {
    if (step < STEPS.length - 1) { setStep(s => s + 1); return }
    setLanguage(lang)
    if (nickname.trim()) sessionStorage.setItem('manasitra_nickname', nickname.trim())
    localStorage.setItem(STORAGE_KEYS.ONBOARDED, 'true')
    navigate('/login', { replace: true })
  }

  return (
    <div className="onboarding-shell">
      <div style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 1 }}>

        {/* Progress bar */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 36 }}>
          {STEPS.map((_, i) => (
            <motion.div key={i}
              animate={{ width: i === step ? 36 : 10, opacity: i <= step ? 1 : 0.25 }}
              transition={{ duration: 0.3 }}
              style={{ height: 4, borderRadius: 2, background: 'var(--primary)' }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── STEP 0: Language ── */}
          {step === 0 && (
            <motion.div key="s0" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22 }}>
              <div className="glass" style={{ padding: '44px 36px' }}>

                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ margin: '0 auto 20px', width: 80, height: 80 }}
                  >
                    <MansitraLogo size={80} />
                  </motion.div>
                  <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, marginBottom: 6 }}>
                    <span className="gradient-text">मनसित्र</span>
                  </h1>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', letterSpacing: '0.04em' }}>
                    Mann Ka Mitra · Companion of the Mind
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
                    {['Anonymous', 'Private', 'Free'].map(b => (
                      <span key={b} className="trust-badge">{b}</span>
                    ))}
                  </div>
                </div>

                <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-2)', marginBottom: 20 }}>
                  {t('onboarding.language_prompt')}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 28, maxHeight: 320, overflowY: 'auto', paddingRight: 4 }}>
                  {SUPPORTED_LANGUAGES.map(l => (
                    <motion.button key={l.code} whileTap={{ scale: 0.96 }} onClick={() => pick(l.code)}
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                        padding: '14px 8px', borderRadius: 14, cursor: 'pointer',
                        border: `2px solid ${lang === l.code ? 'var(--primary)' : 'var(--border)'}`,
                        background: lang === l.code ? 'var(--primary-soft)' : 'rgba(255,255,255,0.03)',
                        transition: 'all 0.15s', minHeight: 68,
                      }}
                    >
                      <span style={{ fontSize: 17, fontWeight: 700, color: lang === l.code ? 'var(--primary)' : 'var(--text)' }}>
                        {l.nativeName}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{l.name}</span>
                    </motion.button>
                  ))}
                </div>

                <motion.button whileTap={{ scale: 0.98 }} onClick={next} className="btn btn-primary" style={{ width: '100%', fontSize: 15, padding: '15px' }}>
                  {t('onboarding.get_started')} <ChevronRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 1: Welcome ── */}
          {step === 1 && (
            <motion.div key="s1" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22 }}>
              <div className="glass" style={{ padding: '44px 36px' }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                  <motion.div animate={{ y: [0,-8,0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ fontSize: 60, marginBottom: 20 }}>🤝</motion.div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, marginBottom: 12, lineHeight: 1.25 }}>
                    {t('onboarding.welcome_title')}
                  </h2>
                  <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.75 }}>
                    {t('onboarding.welcome_subtitle')}
                  </p>
                </div>

                {/* Nickname */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, color: 'var(--text-2)', marginBottom: 8, fontWeight: 500 }}>
                    {t('onboarding.set_nickname')}
                  </label>
                  <input className="input" placeholder={t('onboarding.nickname_placeholder')}
                    value={nickname} onChange={e => setNickname(e.target.value)} maxLength={20} autoComplete="off" />
                </div>

                {/* Disclaimer */}
                <div style={{
                  padding: '14px 16px', borderRadius: 12, marginBottom: 28,
                  background: 'rgba(240,184,96,0.07)', border: '1px solid rgba(240,184,96,0.22)',
                }}>
                  <p style={{ fontSize: 12, color: 'var(--warning)', lineHeight: 1.65 }}>
                    {t('onboarding.disclaimer')}
                  </p>
                </div>

                <motion.button whileTap={{ scale: 0.98 }} onClick={next} className="btn btn-primary" style={{ width: '100%', fontSize: 15, padding: '15px' }}>
                  Continue <ChevronRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Privacy ── */}
          {step === 2 && (
            <motion.div key="s2" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.22 }}>
              <div className="glass" style={{ padding: '44px 36px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                    background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid var(--border)',
                  }}>
                    <Shield size={24} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>{t('privacy.title')}</h2>
                    <p style={{ fontSize: 13, color: 'var(--text-2)' }}>Your data, your control — always</p>
                  </div>
                </div>

                {[
                  { icon: EyeOff,   color: 'var(--primary)',   title: 'Completely anonymous',   desc: 'No name, email, or login ever required' },
                  { icon: Lock,     color: 'var(--secondary)', title: 'Session-only memory',    desc: 'Chats are cleared when you leave' },
                  { icon: Heart,    color: 'var(--success)',   title: 'Your device, your data', desc: 'Mood logs stay only on your device' },
                  { icon: Trash2,   color: 'var(--warning)',   title: 'One-tap delete',         desc: 'Erase everything instantly, anytime' },
                  { icon: Sparkles, color: 'var(--primary)',   title: 'No ads, ever',           desc: 'Your pain is not a product' },
                ].map(({ icon: Icon, color, title, desc }, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                    style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid var(--border)' }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{title}</p>
                      <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{desc}</p>
                    </div>
                  </motion.div>
                ))}

                <motion.button whileTap={{ scale: 0.98 }} onClick={next} className="btn btn-primary" style={{ width: '100%', fontSize: 15, padding: '15px', marginTop: 28 }}>
                  I understand — Let's begin <ChevronRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
