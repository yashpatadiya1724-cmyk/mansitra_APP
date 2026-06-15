import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, RefreshCw } from 'lucide-react'

const WORD_SETS = {
  en: [
    { word: 'BREATHE',   color: '#62C8B9', meaning: 'You are breathing. You are alive. That is enough.' },
    { word: 'ENOUGH',    color: '#9B8FF0', meaning: 'You are enough exactly as you are right now.' },
    { word: 'PRESENT',   color: '#5DD6A0', meaning: 'This moment is all that exists. Be here.' },
    { word: 'RELEASE',   color: '#5B9BD5', meaning: 'Let go of what you cannot control.' },
    { word: 'WORTHY',    color: '#F0B860', meaning: 'You deserve care, rest, and kindness.' },
    { word: 'COURAGE',   color: '#E87090', meaning: 'Asking for help takes real courage.' },
    { word: 'PROGRESS',  color: '#9B8FF0', meaning: 'Small steps are still steps forward.' },
    { word: 'SAFE',      color: '#62C8B9', meaning: 'Right now, in this moment, you are safe.' },
    { word: 'STRONG',    color: '#5DD6A0', meaning: 'You have survived every hard day so far.' },
    { word: 'HOPE',      color: '#F0B860', meaning: 'Tomorrow holds possibilities you cannot see yet.' },
  ],
  hi: [
    { word: 'सांस',     color: '#62C8B9', meaning: 'तुम सांस ले रहे हो। तुम जीवित हो। यही काफी है।' },
    { word: 'काफी',     color: '#9B8FF0', meaning: 'तुम अभी जैसे हो, वैसे ही काफी हो।' },
    { word: 'वर्तमान', color: '#5DD6A0', meaning: 'यह पल ही सब कुछ है। यहाँ रहो।' },
    { word: 'छोड़ो',    color: '#5B9BD5', meaning: 'जो तुम्हारे नियंत्रण में नहीं, उसे जाने दो।' },
    { word: 'योग्य',    color: '#F0B860', meaning: 'तुम देखभाल, आराम और दयालुता के हकदार हो।' },
    { word: 'साहस',     color: '#E87090', meaning: 'मदद माँगने में असली साहस है।' },
    { word: 'प्रगति',  color: '#9B8FF0', meaning: 'छोटे कदम भी आगे बढ़ना है।' },
    { word: 'सुरक्षित', color: '#62C8B9', meaning: 'अभी इस पल में, तुम सुरक्षित हो।' },
    { word: 'मजबूत',   color: '#5DD6A0', meaning: 'तुमने अब तक हर मुश्किल दिन पार किया है।' },
    { word: 'उम्मीद',  color: '#F0B860', meaning: 'कल में ऐसी संभावनाएं हैं जो तुम अभी नहीं देख सकते।' },
  ],
  gu: [
    { word: 'શ્વાસ',    color: '#62C8B9', meaning: 'તું શ્વાસ લઈ રહ્યો છે. તું જીવિત છે. આ જ પૂરતું છે.' },
    { word: 'પૂરતું',   color: '#9B8FF0', meaning: 'તું અત્યારે જેવો છે, તેવો જ પૂરતો છે.' },
    { word: 'વર્તમાન', color: '#5DD6A0', meaning: 'આ ક્ષણ જ સર્વસ્વ છે. અહીં રહ.' },
    { word: 'છોડ',      color: '#5B9BD5', meaning: 'જે તારા નિયંત્રણમાં નથી, તેને જવા દે.' },
    { word: 'લાયક',     color: '#F0B860', meaning: 'તું કાળજી, આરામ અને દયાળુતાને લાયક છે.' },
    { word: 'હિંમત',    color: '#E87090', meaning: 'મદદ માગવામાં સાચી હિંમત છે.' },
    { word: 'પ્રગતિ',  color: '#9B8FF0', meaning: 'નાના પગલાં પણ આગળ વધવું છે.' },
    { word: 'સુરક્ષિત', color: '#62C8B9', meaning: 'અત્યારે આ ક્ષણમાં, તું સુરક્ષિત છે.' },
    { word: 'મજબૂત',   color: '#5DD6A0', meaning: 'તેં અત્યાર સુધી દરેક મુશ્કેલ દિવસ પાર કર્યો છે.' },
    { word: 'આશા',      color: '#F0B860', meaning: 'આવતીકાલ એવી શક્યતાઓ ધરાવે છે જે તું હજી જોઈ શકતો નથી.' },
  ],
}

export const WordReset = ({ standalone }) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const lang = i18n.language
  const words = WORD_SETS[lang] || WORD_SETS.en
  const [idx, setIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [done, setDone] = useState(false)
  const [seen, setSeen] = useState(0)

  const current = words[idx]

  const next = () => {
    if (seen + 1 >= words.length) { setDone(true); return }
    setSeen(s => s + 1)
    setIdx(i => (i + 1) % words.length)
    setRevealed(false)
  }

  const shuffle = () => {
    setIdx(Math.floor(Math.random() * words.length))
    setRevealed(false)
    setSeen(0)
    setDone(false)
  }

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
      {standalone && (
        <button onClick={() => navigate('/games')}
          style={{ position: 'absolute', top: 16, left: 16, width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        ><ArrowLeft size={18} /></button>
      )}

      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{t('games.word_reset')}</h1>
        <p style={{ fontSize: 13, color: 'var(--text-2)' }}>{t('games.word_reset_desc')}</p>
      </div>

      {done ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', marginTop: 32 }}>
          <div style={{ width:64, height:64, borderRadius:18, background:'var(--primary-soft)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
            <RefreshCw size={28} style={{ color:'var(--primary)' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>All words seen.</p>
          <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 24 }}>Carry one of these with you today.</p>
          <button onClick={shuffle} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, margin: '0 auto' }}>
            <RefreshCw size={16} /> Start again
          </button>
        </motion.div>
      ) : (
        <div style={{ width: '100%', maxWidth: 380, marginTop: 32 }}>
          {/* Word card */}
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setRevealed(true)}
            style={{
              padding: '48px 32px', borderRadius: 24, textAlign: 'center', cursor: revealed ? 'default' : 'pointer',
              background: `linear-gradient(135deg, ${current.color}18 0%, ${current.color}08 100%)`,
              border: `2px solid ${current.color}30`,
              marginBottom: 20, minHeight: 200,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: current.color, letterSpacing: '0.08em', marginBottom: revealed ? 20 : 0 }}>
              {current.word}
            </p>
            <AnimatePresence>
              {revealed && (
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7, fontStyle: 'italic' }}
                >
                  "{current.meaning}"
                </motion.p>
              )}
            </AnimatePresence>
            {!revealed && (
              <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 16 }}>Tap to reveal</p>
            )}
          </motion.div>

          {/* Progress dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 24 }}>
            {words.map((_, i) => (
              <div key={i} style={{ width: i === idx ? 20 : 7, height: 7, borderRadius: 4, background: i <= seen ? current.color : 'var(--border)', transition: 'all 0.3s' }} />
            ))}
          </div>

          <button onClick={next}
            style={{ width: '100%', padding: '14px', borderRadius: 14, cursor: 'pointer', border: 'none', background: revealed ? `linear-gradient(135deg, ${current.color} 0%, ${current.color}CC 100%)` : 'var(--surface)', color: revealed ? 'white' : 'var(--text-2)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, transition: 'all 0.2s', border: `1px solid ${revealed ? 'transparent' : 'var(--border)'}` }}
          >
            {revealed ? 'Next word →' : 'Skip'}
          </button>
        </div>
      )}
    </div>
  )
}
