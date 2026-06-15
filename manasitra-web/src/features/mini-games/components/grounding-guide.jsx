import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Check, Eye, Hand, Ear, Wind, Coffee } from 'lucide-react'

const STEPS = [
  { count: 5, Icon: Eye,   sense: 'see',   prompt: 'Name 5 things you can SEE right now' },
  { count: 4, Icon: Hand,  sense: 'touch', prompt: 'Name 4 things you can physically FEEL' },
  { count: 3, Icon: Ear,   sense: 'hear',  prompt: 'Name 3 things you can HEAR' },
  { count: 2, Icon: Wind,  sense: 'smell', prompt: 'Name 2 things you can SMELL' },
  { count: 1, Icon: Coffee,sense: 'taste', prompt: 'Name 1 thing you can TASTE' },
]

const STEP_COLORS = ['var(--primary)', 'var(--secondary)', '#5DD6A0', '#F0B860', '#E87090']

export const GroundingGuide = ({ standalone }) => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [tapped, setTapped] = useState(0)

  const current = STEPS[step]
  const color = STEP_COLORS[step]

  const handleTap = () => {
    const next = tapped + 1
    if (next >= current.count) {
      if (step >= STEPS.length - 1) { setDone(true); return }
      setStep(s => s + 1)
      setTapped(0)
    } else {
      setTapped(next)
    }
  }

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
      {standalone && (
        <button onClick={() => navigate('/games')}
          style={{ position: 'absolute', top: 16, left: 16, width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        ><ArrowLeft size={18} /></button>
      )}

      {done ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
          <div style={{ width:72, height:72, borderRadius:20, background:'var(--primary-soft)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
            <Check size={36} style={{ color:'var(--primary)' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>You're grounded.</p>
          <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 28, lineHeight: 1.7 }}>
            You just brought yourself back to the present moment. That takes real courage.
          </p>
          <button onClick={() => { setStep(0); setTapped(0); setDone(false) }}
            style={{ padding: '13px 28px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%)', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
          >Do it again</button>
        </motion.div>
      ) : (
        <>
          {/* Progress */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 36 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{ height: 5, width: 36, borderRadius: 3, background: i < step ? 'var(--primary)' : i === step ? color : 'var(--border)', transition: 'background 0.3s' }} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              style={{ textAlign: 'center', marginBottom: 32 }}
            >
              <div style={{ width:72, height:72, borderRadius:20, background:`${color}18`, border:`1px solid ${color}30`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
                <current.Icon size={36} style={{ color }} />
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 8, color }}>{current.prompt}</p>
              <p style={{ fontSize: 14, color: 'var(--text-2)' }}>{tapped} / {current.count} done</p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 36 }}>
            {Array.from({ length: current.count }).map((_, i) => (
              <motion.div key={i} animate={{ scale: i < tapped ? 1 : 0.8 }}
                style={{ width: 36, height: 36, borderRadius: '50%', border: `2px solid ${i < tapped ? color : 'var(--border)'}`, background: i < tapped ? `${color}20` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              >
                {i < tapped && <Check size={16} style={{ color }} />}
              </motion.div>
            ))}
          </div>

          <button onClick={handleTap}
            style={{ padding: '14px 36px', borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`, color: 'white', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: `0 4px 20px ${color}40` }}
          >
            {tapped === 0 ? 'Start' : `Got one (${tapped}/${current.count})`}
          </button>
        </>
      )}
    </div>
  )
}
