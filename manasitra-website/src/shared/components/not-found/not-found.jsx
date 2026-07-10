import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, MessageCircle } from 'lucide-react'

export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', maxWidth: 360 }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🌫️</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 10 }}>
          Page not found
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 28 }}>
          This page doesn't exist. But Manasitra does — and it's ready to listen whenever you are.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button onClick={() => navigate('/chat')}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%)', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 16px var(--primary-glow)' }}
          ><MessageCircle size={16} /> Open Chat</button>
          <button onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 12, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
          ><Home size={16} /> Go Back</button>
        </div>
      </motion.div>
    </div>
  )
}
