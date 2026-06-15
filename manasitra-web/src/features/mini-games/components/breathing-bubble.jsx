import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'

const PHASES = [
  { label: 'Breathe in',  duration: 4, scale: 1.5 },
  { label: 'Hold',        duration: 7, scale: 1.5 },
  { label: 'Breathe out', duration: 8, scale: 1 },
]
const TOTAL_ROUNDS = 3

export const BreathingBubble = ({ standalone }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [phase, setPhase] = useState(0)
  const [round, setRound] = useState(1)
  const [count, setCount] = useState(PHASES[0].duration)
  const [done, setDone] = useState(false)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running || done) return
    if (count <= 0) {
      const next = (phase + 1) % PHASES.length
      if (next === 0) {
        if (round >= TOTAL_ROUNDS) { setDone(true); return }
        setRound(r => r + 1)
      }
      setPhase(next)
      setCount(PHASES[next].duration)
      return
    }
    const timer = setTimeout(() => setCount(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [count, phase, round, running, done])

  const current = PHASES[phase]
  const reset = () => { setDone(false); setPhase(0); setRound(1); setCount(PHASES[0].duration); setRunning(false) }

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
      {standalone && (
        <button onClick={() => navigate('/games')}
          style={{ position: 'absolute', top: 16, left: 16, width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        ><ArrowLeft size={18} /></button>
      )}

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 6, textAlign: 'center' }}>{t('games.breathing')}</h1>
      <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 40, textAlign: 'center' }}>4-7-8 breathing technique</p>

      {done ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🌿</div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Well done.</p>
          <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 28 }}>You just gave your nervous system a reset.</p>
          <button onClick={reset} style={{ padding: '13px 28px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%)', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
            Do it again
          </button>
        </motion.div>
      ) : (
        <>
          {/* Bubble */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
            <motion.div
              animate={{ scale: running ? current.scale : 1 }}
              transition={{ duration: current.duration, ease: 'easeInOut' }}
              style={{ width: 160, height: 160, borderRadius: '50%', background: 'rgba(155,143,240,0.15)', border: '2px solid rgba(155,143,240,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <motion.div
                animate={{ scale: running ? current.scale * 0.65 : 0.65 }}
                transition={{ duration: current.duration, ease: 'easeInOut' }}
                style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(155,143,240,0.35)' }}
              />
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.p key={phase} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}
            >{running ? current.label : 'Ready?'}</motion.p>
          </AnimatePresence>

          {running && <p style={{ fontSize: 36, fontWeight: 800, color: 'var(--primary)', marginBottom: 8, fontFamily: 'var(--font-display)' }}>{count}</p>}
          <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 32 }}>Round {round} of {TOTAL_ROUNDS}</p>

          {!running ? (
            <button onClick={() => setRunning(true)} style={{ padding: '13px 32px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%)', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 4px 20px var(--primary-glow)' }}>
              Start breathing
            </button>
          ) : (
            <button onClick={() => { setRunning(false); setPhase(0); setCount(PHASES[0].duration) }}
              style={{ padding: '11px 24px', borderRadius: 12, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer', fontSize: 13 }}
            >Stop</button>
          )}
        </>
      )}
    </div>
  )
}
