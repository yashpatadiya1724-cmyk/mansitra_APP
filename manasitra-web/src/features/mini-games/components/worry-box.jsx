import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Lock, Trash2, Plus } from 'lucide-react'

const REFRAMES = {
  en: [
    "Is this within your control right now?",
    "Will this matter in 5 years?",
    "What's the smallest step you could take?",
    "What would you tell a friend in this situation?",
    "Is this a fact or a fear?",
  ],
  hi: [
    "क्या यह अभी तुम्हारे नियंत्रण में है?",
    "क्या यह 5 साल में मायने रखेगा?",
    "तुम सबसे छोटा कदम क्या उठा सकते हो?",
    "इस स्थिति में तुम किसी दोस्त को क्या कहते?",
    "क्या यह एक तथ्य है या एक डर?",
  ],
  gu: [
    "શું આ અત્યારે તારા નિયંત્રણમાં છે?",
    "શું આ 5 વર્ષ પછી મહત્વ ધરાવશે?",
    "તું સૌથી નાનું પગલું શું ભરી શકે?",
    "આ પરિસ્થિતિમાં તું કોઈ મિત્રને શું કહેત?",
    "શું આ એક હકીકત છે કે ભય?",
  ],
}

export const WorryBox = ({ standalone }) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const lang = i18n.language
  const reframes = REFRAMES[lang] || REFRAMES.en
  const [worry, setWorry] = useState('')
  const [locked, setLocked] = useState(false)
  const [reframeIdx, setReframeIdx] = useState(0)
  const [answered, setAnswered] = useState(null)
  const [released, setReleased] = useState(false)
  const [history, setHistory] = useState([])

  const lockWorry = () => {
    if (!worry.trim()) return
    setLocked(true)
    setReframeIdx(Math.floor(Math.random() * reframes.length))
    setAnswered(null)
    setReleased(false)
  }

  const release = () => {
    setHistory(prev => [...prev, { id: crypto.randomUUID(), text: worry, timestamp: Date.now() }])
    setReleased(true)
    setTimeout(() => {
      setWorry('')
      setLocked(false)
      setReleased(false)
      setAnswered(null)
    }, 2500)
  }

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {standalone && (
        <button onClick={() => navigate('/games')}
          style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        ><ArrowLeft size={18} /></button>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px 24px' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{t('games.worry_box')}</h1>
            <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
              Write your worry, lock it in the box, then let it go. The box holds it so you don't have to.
            </p>
          </div>

          {/* Released animation */}
          <AnimatePresence>
            {released && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                style={{ textAlign: 'center', padding: '32px 24px', borderRadius: 20, background: 'rgba(93,214,160,0.08)', border: '1px solid rgba(93,214,160,0.2)', marginBottom: 20 }}
              >
                <motion.div animate={{ y: [0, -20, -40], opacity: [1, 0.5, 0] }} transition={{ duration: 2 }} style={{ fontSize: 36, marginBottom: 12 }}>📦</motion.div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--success)', marginBottom: 6 }}>Released.</p>
                <p style={{ fontSize: 13, color: 'var(--text-2)' }}>The box has it now. You can breathe.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!released && (
            <>
              {/* Write worry */}
              {!locked ? (
                <div>
                  <textarea value={worry} onChange={e => setWorry(e.target.value)}
                    placeholder="Write your worry here... be specific, be honest"
                    rows={4} maxLength={300}
                    style={{ width: '100%', padding: '14px 16px', borderRadius: 14, resize: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', lineHeight: 1.65, marginBottom: 12 }}
                  />
                  <button onClick={lockWorry} disabled={!worry.trim()}
                    style={{ width: '100%', padding: '14px', borderRadius: 14, border: 'none', cursor: worry.trim() ? 'pointer' : 'not-allowed', background: worry.trim() ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%)' : 'rgba(255,255,255,0.05)', color: worry.trim() ? 'white' : 'var(--text-3)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: worry.trim() ? '0 4px 20px var(--primary-glow)' : 'none' }}
                  ><Lock size={16} /> Lock it in the box</button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  {/* Locked worry */}
                  <div style={{ padding: '16px 18px', borderRadius: 14, background: 'rgba(155,143,240,0.08)', border: '1px solid var(--border)', marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <Lock size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
                    <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, fontStyle: 'italic' }}>"{worry}"</p>
                  </div>

                  {/* Reframe question */}
                  <div style={{ padding: '16px 18px', borderRadius: 14, background: 'rgba(98,200,185,0.08)', border: '1px solid rgba(98,200,185,0.2)', marginBottom: 16 }}>
                    <p style={{ fontSize: 12, color: 'var(--secondary)', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Reflect</p>
                    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.65, marginBottom: 14 }}>{reframes[reframeIdx]}</p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['Yes', 'No', 'Not sure'].map(ans => (
                        <button key={ans} onClick={() => setAnswered(ans)}
                          style={{ flex: 1, padding: '8px', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 500, border: `1.5px solid ${answered === ans ? 'var(--secondary)' : 'var(--border)'}`, background: answered === ans ? 'rgba(98,200,185,0.12)' : 'transparent', color: answered === ans ? 'var(--secondary)' : 'var(--text-2)', transition: 'all 0.15s' }}
                        >{ans}</button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => { setLocked(false); setAnswered(null) }}
                      style={{ flex: 1, padding: '12px', borderRadius: 12, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer', fontSize: 13 }}
                    >Edit worry</button>
                    <button onClick={release}
                      style={{ flex: 2, padding: '12px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, var(--success) 0%, #4CAF82 100%)', color: 'white', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                    >Release it ✓</button>
                  </div>
                </motion.div>
              )}
            </>
          )}

          {/* History */}
          {history.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <p style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                Released today ({history.length})
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {history.map(h => (
                  <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 10, background: 'rgba(93,214,160,0.05)', border: '1px solid rgba(93,214,160,0.12)' }}>
                    <span style={{ color: 'var(--success)', fontSize: 14 }}>✓</span>
                    <span style={{ flex: 1, fontSize: 13, color: 'var(--text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.text}</span>
                    <button onClick={() => setHistory(prev => prev.filter(x => x.id !== h.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', padding: 2 }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
