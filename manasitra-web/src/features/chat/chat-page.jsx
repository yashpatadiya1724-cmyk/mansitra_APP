import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useSessionStore } from '@store/session-store'
import { useChat } from './hooks/use-chat'
import { MessageBubble } from './components/message-bubble'
import { TypingIndicator } from './components/typing-indicator'
import { InputBar } from './components/input-bar'
import { DailyCheckInPrompt } from './components/daily-checkin-prompt'
import { ContextModeBar } from './components/context-mode-bar'
import { BreathingNudge } from './components/breathing-nudge'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ChevronDown, Gamepad2, BarChart2 } from 'lucide-react'
import { useMoodStore } from '@store/mood-store'
import { useProgressStore } from '@store/progress-store'
import quotes from '@data/quotes/quotes.json'
import { MansitraLogo } from '@components/logo'
import { PermissionDialog, shouldShowPermissionDialog } from '@components/permission-dialog/permission-dialog'
import { useSpeaker } from '@hooks/use-speaker'

const WELCOME_MESSAGES = {
  en: [
    "Hey, I'm Mansitra — your private companion. Whatever's on your mind, I'm here to listen. What's going on today?",
    "Hi! I'm Mansitra. I was just waiting for you. How are you feeling right now?",
    "Hey friend, it's good to see you. I'm here if you want to talk or just vent about something."
  ],
  hi: [
    "नमस्ते, मैं मन्सित्रा हूँ — तुम्हारा निजी साथी। जो भी मन में है, मैं सुनने के लिए यहाँ हूँ। आज क्या चल रहा है?",
    "नमस्ते! मैं तुम्हारा दोस्त मन्सित्रा। मैं तुम्हारा ही इंतज़ार कर रहा था। अभी कैसा महसूस कर रहे हो?",
    "हेलो दोस्त, तुम्हें देख कर अच्छा लगा। अगर कुछ बात करनी हो या बस मन हल्का करना हो, तो मैं यहीं हूँ।"
  ],
}

const CHIP_POOL = {
  en: ["I'm stressed about exams", "I feel really lonely", "I can't focus on anything", "I need some motivation", "I'm having a panic attack", "I feel like giving up", "Just want to chat", "Had a rough day"],
  hi: ["परीक्षा की बहुत चिंता है", "बहुत अकेला महसूस हो रहा है", "कुछ भी focus नहीं हो रहा", "थोड़ी motivation चाहिए", "मन बहुत उदास है", "दिन बहुत खराब गया"]
}

export const ChatPage = () => {
  const { t, i18n } = useTranslation()
  const { messages, isTyping, nickname } = useSessionStore()
  const { addMoodEntry } = useMoodStore()
  const { recordCheckIn } = useProgressStore()
  const { sendMessage, backendError } = useChat()
  const lang = i18n.language

  const [showPermDialog, setShowPermDialog] = useState(shouldShowPermissionDialog())

  const scrollRef = useRef(null)
  const bottomRef = useRef(null)
  const [showScrollBtn, setShowScrollBtn] = useState(false)

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 100
    setShowScrollBtn(!isAtBottom)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Memoize random welcome and chips for the session
  const [welcome] = useState(() => {
    const list = WELCOME_MESSAGES[lang] || WELCOME_MESSAGES.en
    return list[Math.floor(Math.random() * list.length)]
  })
  const [chips] = useState(() => {
    const pool = CHIP_POOL[lang] || CHIP_POOL.en
    return [...pool].sort(() => 0.5 - Math.random()).slice(0, 4)
  })

  // Daily quote — rotates by day of year
  const langQuotes = quotes[lang] || quotes.en
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
  const todayQuote = langQuotes[dayOfYear % langQuotes.length]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxHeight: '100vh', position: 'relative' }}>

      {/* ── Permission Dialog (first launch) ── */}
      {showPermDialog && (
        <PermissionDialog onDone={() => setShowPermDialog(false)} />
      )}

      {/* ── Header ── */}
      <div style={{
        flexShrink: 0,
        background: 'var(--surface)',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        position: 'relative', zIndex: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src="/robot.png" alt="Bobo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--text)', lineHeight: 1.2 }}>Mansitra</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', animation: 'pulse-ring 2s infinite' }} />
                <p style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500 }}>Online</p>
              </div>
            </div>
          </div>

          {/* Quick access buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link to="/games" title="Games" style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'var(--text-2)', border: '1px solid var(--border)', transition: 'all 0.2s' }}>
              <Gamepad2 size={16} />
            </Link>
            <Link to="/dashboard" title="Dashboard" style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'var(--text-2)', border: '1px solid var(--border)', transition: 'all 0.2s' }}>
              <BarChart2 size={16} />
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 10px', borderRadius: 999, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <Shield size={12} style={{ color: 'var(--success)' }} />
              <span style={{ fontSize: 11, color: 'var(--success)', fontWeight: 700 }}>Private</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Context mode bar ── */}
      <ContextModeBar />

      {/* ── Messages ── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ flex: 1, overflowY: 'auto', padding: '24px', position: 'relative', zIndex: 1 }}
        role="log" aria-label={t('a11y.chat_region')} aria-live="polite"
      >
        {/* Backend error banner removed — app now calls Groq directly */}

        {/* Welcome state */}
        {messages.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '4vh' }}
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: 'relative', marginBottom: 24 }}
            >
              <img src="/robot.png" alt="Robot Mascot" style={{ width: 120, height: 120, objectFit: 'contain' }} />
              {/* Fake bubbles */}
              <div style={{ position: 'absolute', top: -10, right: -10, width: 12, height: 12, borderRadius: '50%', background: 'var(--primary)' }} />
              <div style={{ position: 'absolute', bottom: 20, left: -20, width: 18, height: 18, borderRadius: '50%', background: 'var(--primary)', opacity: 0.5 }} />
              <div style={{ position: 'absolute', top: 40, right: -30, width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} />
            </motion.div>

            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>Welcome to Manasitra</h2>
            <p style={{ fontSize: 15, color: 'var(--text-2)', maxWidth: 280, lineHeight: 1.5, marginBottom: 32 }}>
              {welcome}
            </p>

            <div style={{ width: '100%', marginBottom: 28 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {chips.map((c, i) => (
                  <motion.button key={i}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => sendMessage(c)}
                    style={{ width: '100%', padding: '16px', borderRadius: 'var(--r-pill)', cursor: 'pointer', border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)', fontSize: 15, fontWeight: 600, transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.background = 'var(--primary-soft)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--surface-2)' }}
                  >{c}</motion.button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, background: 'rgba(91,168,138,0.07)', border: '1px solid rgba(91,168,138,0.18)', marginBottom: 8 }}>
              <Shield size={13} style={{ color: 'var(--success)', flexShrink: 0 }} />
              <p style={{ fontSize: 12, color: 'var(--text-3)' }}>This conversation is private. Nothing is stored after you leave.</p>
            </div>

            {/* Daily quote */}
            {todayQuote && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                style={{ padding: '12px 16px', borderRadius: 12, background: 'linear-gradient(135deg, rgba(126,186,168,0.10) 0%, rgba(74,124,111,0.06) 100%)', border: '1px solid var(--border)', marginBottom: 8 }}
              >
                <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65, fontStyle: 'italic' }}>
                  "{todayQuote.text}"
                </p>
                <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 5 }}>— {todayQuote.author}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Scroll to bottom button */}
      <AnimatePresence>
        {showScrollBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            onClick={() => scrollToBottom()}
            style={{
              position: 'absolute', bottom: 90, right: 24, zIndex: 10,
              width: 40, height: 40, borderRadius: '50%',
              background: 'var(--primary)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', boxShadow: '0 4px 16px var(--primary-glow)',
            }}
            aria-label="Scroll to latest message"
          >
            <ChevronDown size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Input ── */}
      <InputBar onSend={sendMessage} disabled={isTyping} />

      {/* ── Daily check-in prompt removed as requested ── */}

      {/* ── Breathing nudge after extended chat ── */}
      <BreathingNudge />
    </div>
  )
}
