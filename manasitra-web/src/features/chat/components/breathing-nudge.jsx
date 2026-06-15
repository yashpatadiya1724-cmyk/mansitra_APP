import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Wind, X } from 'lucide-react'
import { useSessionStore } from '@store/session-store'

// After 8+ messages in a session, gently suggest a breathing break
export const BreathingNudge = () => {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const messages = useSessionStore(s => s.messages)
  const navigate = useNavigate()

  useEffect(() => {
    if (dismissed) return
    // Show after 8 messages (4 exchanges) — user has been chatting a while
    if (messages.length === 8) {
      const timer = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [messages.length, dismissed])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            position: 'fixed', bottom: 90, right: 16, zIndex: 25,
            maxWidth: 240,
            background: 'var(--surface)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(98,200,185,0.3)',
            borderRadius: 16, padding: '14px 16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          <button onClick={() => { setVisible(false); setDismissed(true) }}
            style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', padding: 2 }}
          ><X size={13} /></button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(98,200,185,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wind size={15} style={{ color: 'var(--secondary)' }} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Take a breath?</p>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 10 }}>
            You've been chatting for a while. A 2-minute breathing exercise can help reset your nervous system.
          </p>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => { setVisible(false); setDismissed(true) }}
              style={{ flex: 1, padding: '7px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer', fontSize: 12 }}
            >Not now</button>
            <button onClick={() => { setVisible(false); navigate('/games/breathing') }}
              style={{ flex: 2, padding: '7px', borderRadius: 8, border: 'none', background: 'var(--secondary)', color: 'white', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
            >Try it</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
