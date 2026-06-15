import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Brain, Activity, Heart, Circle, Hand, Layers, Footprints, Leaf } from 'lucide-react'

const ZONES = [
  { id: 'head',  label: 'Head & Face',       Icon: Brain,      y: '8%',  instruction: 'Notice any tension in your forehead, jaw, or eyes. Gently relax them. Let your face go soft.' },
  { id: 'neck',  label: 'Neck & Shoulders',  Icon: Activity,   y: '22%', instruction: 'Feel the weight of your shoulders. Let them drop away from your ears. Release any tightness in your neck.' },
  { id: 'chest', label: 'Chest & Heart',     Icon: Heart,      y: '36%', instruction: 'Place your awareness on your chest. Feel it rise and fall. Notice your heartbeat. It has been working for you all day.' },
  { id: 'belly', label: 'Belly & Core',      Icon: Circle,     y: '50%', instruction: 'Soften your belly. Many of us hold stress here. Take a breath into this area and let it expand.' },
  { id: 'hands', label: 'Arms & Hands',      Icon: Hand,       y: '58%', instruction: 'Unclench your hands. Wiggle your fingers. Let your arms feel heavy and relaxed.' },
  { id: 'hips',  label: 'Hips & Lower Back', Icon: Layers,     y: '68%', instruction: 'Notice your hips and lower back. If you are sitting, feel the support beneath you. Release any holding.' },
  { id: 'legs',  label: 'Legs & Feet',       Icon: Footprints, y: '82%', instruction: 'Feel your legs. Notice where they touch the floor or chair. Let them be heavy. Your feet are grounded.' },
]

const TENSION_LEVELS = ['None', 'A little', 'Moderate', 'High']
const TENSION_COLORS = ['var(--success)', '#A8D8A8', 'var(--warning)', 'var(--danger)']

export const BodyScan = ({ standalone }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [step, setStep] = useState(-1) // -1 = intro
  const [tension, setTension] = useState({})
  const [done, setDone] = useState(false)
  const [countdown, setCountdown] = useState(8)
  const [counting, setCounting] = useState(false)

  useEffect(() => {
    if (!counting || countdown <= 0) return
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [counting, countdown])

  useEffect(() => {
    if (countdown === 0 && counting) {
      setCounting(false)
      if (step < ZONES.length - 1) {
        setStep(s => s + 1)
        setCountdown(8)
      } else {
        setDone(true)
      }
    }
  }, [countdown, counting, step])

  const current = step >= 0 ? ZONES[step] : null
  const highTensionZones = Object.entries(tension).filter(([, v]) => v >= 2).map(([k]) => ZONES.find(z => z.id === k)?.label)

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {standalone && (
        <button onClick={() => navigate('/games')}
          style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        ><ArrowLeft size={18} /></button>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px 24px' }}>

        {/* Intro */}
        {step === -1 && !done && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', maxWidth: 380 }}>
            <div style={{ width:72, height:72, borderRadius:20, background:'var(--primary-soft)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
              <Leaf size={36} style={{ color:'var(--primary)' }} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{t('games.body_scan')}</h1>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 28 }}>
              We'll move through 7 areas of your body. For each one, notice any tension and gently release it. This takes about 2 minutes.
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 24 }}>Find a comfortable position. Close your eyes if you can.</p>
            <button onClick={() => { setStep(0); setCounting(true) }}
              style={{ padding: '14px 32px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%)', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 4px 20px var(--primary-glow)' }}
            >Begin scan</button>
          </motion.div>
        )}

        {/* Active scan */}
        {step >= 0 && !done && current && (
          <motion.div key={step} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
            {/* Progress */}
            <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginBottom: 28 }}>
              {ZONES.map((_, i) => (
                <div key={i} style={{ height: 4, flex: 1, borderRadius: 2, background: i < step ? 'var(--primary)' : i === step ? 'var(--secondary)' : 'var(--border)', transition: 'background 0.3s' }} />
              ))}
            </div>

            <div style={{ width:64, height:64, borderRadius:18, background:`rgba(98,200,185,0.12)`, border:'1px solid rgba(98,200,185,0.25)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
              <current.Icon size={30} style={{ color:'var(--secondary)' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 16, color: 'var(--secondary)' }}>{current.label}</h2>

            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 24, padding: '0 8px' }}>
              {current.instruction}
            </p>

            {/* Countdown ring */}
            <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 24px' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="40" cy="40" r="34" fill="none" stroke="var(--border)" strokeWidth="5" />
                <circle cx="40" cy="40" r="34" fill="none" stroke="var(--secondary)" strokeWidth="5"
                  strokeDasharray={2 * Math.PI * 34}
                  strokeDashoffset={2 * Math.PI * 34 * (1 - countdown / 8)}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--secondary)' }}>
                {countdown}
              </div>
            </div>

            {/* Tension rating */}
            <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 10 }}>How much tension do you feel here?</p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
              {TENSION_LEVELS.map((level, i) => (
                <button key={i} onClick={() => setTension(prev => ({ ...prev, [current.id]: i }))}
                  style={{
                    padding: '6px 12px', borderRadius: 999, cursor: 'pointer', fontSize: 12, fontWeight: 500,
                    border: `1.5px solid ${tension[current.id] === i ? TENSION_COLORS[i] : 'var(--border)'}`,
                    background: tension[current.id] === i ? `${TENSION_COLORS[i]}18` : 'transparent',
                    color: tension[current.id] === i ? TENSION_COLORS[i] : 'var(--text-2)',
                    transition: 'all 0.15s',
                  }}
                >{level}</button>
              ))}
            </div>

            <button onClick={() => { if (step < ZONES.length - 1) { setStep(s => s + 1); setCountdown(8); setCounting(true) } else setDone(true) }}
              style={{ padding: '11px 24px', borderRadius: 12, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer', fontSize: 13 }}
            >Skip to next</button>
          </motion.div>
        )}

        {/* Done */}
        {done && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', maxWidth: 380 }}>
            <div style={{ width:72, height:72, borderRadius:20, background:'var(--primary-soft)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
              <Leaf size={36} style={{ color:'var(--primary)' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Scan complete.</h2>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 20 }}>
              You just gave your body full attention. That is a form of self-care.
            </p>
            {highTensionZones.length > 0 && (
              <div style={{ padding: '14px 18px', borderRadius: 14, background: 'rgba(240,184,96,0.08)', border: '1px solid rgba(240,184,96,0.2)', marginBottom: 20, textAlign: 'left' }}>
                <p style={{ fontSize: 13, color: 'var(--warning)', fontWeight: 600, marginBottom: 6 }}>Areas with tension:</p>
                {highTensionZones.map(z => (
                  <p key={z} style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 3 }}>• {z} — try gentle stretching or breathing into this area</p>
                ))}
              </div>
            )}
            <button onClick={() => { setStep(-1); setDone(false); setTension({}); setCountdown(8); setCounting(false) }}
              style={{ padding: '13px 28px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%)', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
            >Do it again</button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
