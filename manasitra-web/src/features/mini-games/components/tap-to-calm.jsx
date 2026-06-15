import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'

export const TapToCalm = ({ standalone }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [ripples, setRipples] = useState([])
  const [tapCount, setTapCount] = useState(0)

  const handleTap = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX ?? e.touches?.[0]?.clientX ?? rect.width / 2) - rect.left
    const y = (e.clientY ?? e.touches?.[0]?.clientY ?? rect.height / 2) - rect.top
    const id = crypto.randomUUID()
    setRipples(prev => [...prev.slice(-10), { id, x, y }])
    setTapCount(c => c + 1)
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1400)
  }, [])

  const colors = ['var(--primary)', 'var(--secondary)', '#5DD6A0', '#F0B860', '#E87090']

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {standalone && (
        <button onClick={() => navigate('/games')}
          style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        ><ArrowLeft size={18} /></button>
      )}

      <div style={{ textAlign: 'center', padding: '60px 24px 16px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{t('games.tap')}</h1>
        <p style={{ fontSize: 13, color: 'var(--text-2)' }}>Tap anywhere. No goal. Just release.</p>
        {tapCount > 0 && <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 6 }}>{tapCount} taps</p>}
      </div>

      <div
        style={{ flex: 1, position: 'relative', overflow: 'hidden', cursor: 'pointer', userSelect: 'none' }}
        onClick={handleTap}
        onTouchStart={handleTap}
        role="button"
        aria-label="Tap to create calming ripples"
        tabIndex={0}
        onKeyDown={e => e.key === ' ' && handleTap({ currentTarget: e.currentTarget, clientX: 0, clientY: 0 })}
      >
        <AnimatePresence>
          {ripples.map(({ id, x, y }, i) => (
            <motion.div key={id}
              initial={{ width: 0, height: 0, opacity: 0.7, x, y }}
              animate={{ width: 320, height: 320, opacity: 0, x: x - 160, y: y - 160 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              style={{ position: 'absolute', borderRadius: '50%', border: `2px solid ${colors[i % colors.length]}`, pointerEvents: 'none', left: 0, top: 0 }}
            />
          ))}
        </AnimatePresence>

        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <p style={{ fontSize: 14, color: 'var(--text-3)', opacity: tapCount > 0 ? 0 : 0.5, transition: 'opacity 0.5s' }}>tap anywhere</p>
        </div>
      </div>
    </div>
  )
}
