import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Heart, SkipForward, RefreshCw } from 'lucide-react'
import { useLanguageStore } from '@store/language-store'
import affirmations from '@data/affirmations/affirmations.json'

export const AffirmationShuffle = ({ standalone }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { selectedLanguage } = useLanguageStore()
  const list = affirmations[selectedLanguage] || affirmations.en
  const [idx, setIdx] = useState(0)
  const [liked, setLiked] = useState([])
  const [dir, setDir] = useState(1)
  const [showLiked, setShowLiked] = useState(false)

  const next = () => { setDir(1); setIdx(i => (i + 1) % list.length) }
  const prev = () => { setDir(-1); setIdx(i => (i - 1 + list.length) % list.length) }
  const like = () => {
    setLiked(prev => prev.includes(list[idx]) ? prev : [...prev, list[idx]])
    next()
  }

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
      {standalone && (
        <button onClick={() => navigate('/games')}
          style={{ position: 'absolute', top: 16, left: 16, width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        ><ArrowLeft size={18} /></button>
      )}

      {liked.length > 0 && (
        <button onClick={() => setShowLiked(!showLiked)}
          style={{ position: 'absolute', top: 16, right: 16, display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 999, border: '1px solid rgba(232,112,144,0.3)', background: 'rgba(232,112,144,0.08)', color: 'var(--danger)', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
        >
          <Heart size={13} /> {liked.length}
        </button>
      )}

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 6, textAlign: 'center' }}>{t('games.affirmations')}</h1>
      <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 36, textAlign: 'center' }}>Words written for you.</p>

      {/* Card */}
      <div style={{ width: '100%', maxWidth: 360, height: 200, position: 'relative', marginBottom: 28 }}>
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity: 0, x: dir * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -50 }}
            transition={{ duration: 0.25 }}
            style={{ position: 'absolute', inset: 0, background: 'var(--surface)', backdropFilter: 'blur(16px)', border: '1px solid var(--border)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 24px', textAlign: 'center' }}
          >
            <p style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.7, color: 'var(--text)' }}>"{list[idx]}"</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress */}
      <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 20 }}>{idx + 1} / {list.length}</p>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={prev}
          style={{ width: 44, height: 44, borderRadius: 12, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        ><SkipForward size={16} style={{ transform: 'rotate(180deg)' }} /></button>

        <button onClick={like}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 14, border: '1px solid rgba(232,112,144,0.3)', background: 'rgba(232,112,144,0.08)', color: 'var(--danger)', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
        ><Heart size={16} /> Save</button>

        <button onClick={next}
          style={{ width: 44, height: 44, borderRadius: 12, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        ><SkipForward size={16} /></button>
      </div>

      {/* Liked list */}
      <AnimatePresence>
        {showLiked && liked.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ width: '100%', maxWidth: 360, marginTop: 24, overflow: 'hidden' }}
          >
            <p style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Saved this session</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {liked.map((a, i) => (
                <div key={i} style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(232,112,144,0.06)', border: '1px solid rgba(232,112,144,0.15)', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
                  "{a}"
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
