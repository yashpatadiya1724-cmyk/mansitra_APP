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
import { Shield, ChevronDown, Gamepad2, BarChart2, Menu, Lock } from 'lucide-react'
import { useMoodStore } from '@store/mood-store'
import { useProgressStore } from '@store/progress-store'
import quotes from '@data/quotes/quotes.json'
import { PermissionDialog, shouldShowPermissionDialog } from '@components/permission-dialog/permission-dialog'

const WELCOME_MESSAGES = {
  en: [
    "Hey, I'm Mitra — your private companion. Whatever's on your mind, I'm here to listen. What's going on today?",
    "Hi! I'm Mitra. I was just waiting for you. How are you feeling right now?",
    "Hey friend, it's good to see you. I'm here if you want to talk or just vent about something."
  ],
  hi: [
    "नमस्ते, मैं मित्रा हूँ — तुम्हारा निजी साथी। जो भी मन में है, मैं सुनने के लिए यहाँ हूँ। आज क्या चल रहा है?",
    "नमस्ते! मैं तुम्हारा दोस्त मित्रा। मैं तुम्हारा ही इंतज़ार कर रहा था। अभी कैसा महसूस कर रहे हो?",
    "हेलो दोस्त, तुम्हें देख कर अच्छा लगा। अगर कुछ बात करनी हो या बस मन हल्का करना हो, तो मैं यहीं हूँ।"
  ],
}

const CHIP_POOL = {
  en: ["I'm stressed about exams", "I feel really lonely", "I can't focus on anything", "I need some motivation", "I'm having a panic attack", "I feel like giving up", "Just want to chat", "Had a rough day"],
  hi: ["परीक्षा की बहुत चिंता है", "बहुत अकेला महसूस हो रहा है", "कुछ भी focus नहीं हो रहा", "थोड़ी motivation चाहिए", "मन बहुत उदास है", "दिन बहुत खराब गया"]
}

export const ChatPage = () => {
  const { t, i18n } = useTranslation()
  const { messages, isTyping } = useSessionStore()
  const { sendMessage } = useChat()
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
    <div className="bg-[var(--color-background)] text-[var(--color-on-surface)] h-screen flex flex-col relative overflow-hidden" style={{ fontFamily: 'var(--font-body)' }}>

      {/* ── Permission Dialog (first launch) ── */}
      {showPermDialog && (
        <PermissionDialog onDone={() => setShowPermDialog(false)} />
      )}

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 w-full z-50 glass-effect bg-[var(--color-surface)]/80 dark:bg-[var(--color-surface-container-high)]/80 h-16 flex items-center px-5 justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 rounded-full hover:bg-[var(--color-primary-container)]/20 transition-colors">
            <Menu className="text-[var(--color-primary)]" size={24} />
          </Link>
          <div className="flex items-center gap-2">
            <img alt="Mitra Lotus Icon" className="w-8 h-8 object-contain" src="https://lh3.googleusercontent.com/aida/AP1WRLsNVMgnnPlJ0696Nr7yH94E0umOgcB_yePrfwQF296Hd2MEli-2SgFPbasuWrB5Sd_dLxdnxQ1pHRlnlf0m8ImtE3fAA8SzfZWl-Py0-6boaKAPcEt2thgD4zFzBM9xNX_8QnTZGRXYj6_E5EjVYMI8-uPfwdJ9uni6pIW4CkhX7Me3BXL4ozXYfn5gDOJgp--Xr0esk2dG-pxJ_u9Xvbo5MQlSZKJQkpXTFJuJryjIKTUsNDUFUyrjVHb7" />
            <span className="text-2xl font-semibold tracking-tight text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-display)' }}>Mitra</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-[var(--color-primary)] font-bold">
            <Lock size={14} />
            <span className="text-sm font-medium">Private & Encrypted</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[var(--color-primary-container)]/20 flex items-center justify-center overflow-hidden border border-[var(--color-primary)]/10">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDypZbKIhdTtU0feRWkv9rJX0R-3GTx_DyeiapRPlU2jNiBQ6BsigBw-X16kxNtcgyr_v4qkJNpOWwvO-Liw0aZzjM0jWyLQLcRfxRmHGNR9d79pWOU1D3feJpXgBweNKmO18i0SYR3_pDt86WHWw7BlhJcu7pvU0QyCwx4lb922hZ9uENfQ70zHfsXy7ksB42q6BVYxF0HbjnIj4XW_ugbjSWpuJxIBk-xl93-ad1bcyrWwLEfCDXGS7ob31a6Y91bx6FM0K1QG78Q" alt="User Avatar" />
          </div>
        </div>
      </header>

      {/* ── Context mode bar ── */}
      <div className="mt-16 z-40 relative">
        <ContextModeBar />
      </div>

      {/* ── Main Content Area: Chat Canvas ── */}
      <main className="flex-1 pb-24 overflow-hidden relative" style={{ marginTop: messages.length === 0 ? '0' : '10px' }}>
        {/* Atmospheric Background Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00bfa5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-[1200px] mx-auto h-full px-5 flex flex-col pt-4">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="chat-container-scroll flex-1 overflow-y-auto space-y-8 pr-2 relative z-10"
            role="log" aria-label={t('a11y.chat_region')} aria-live="polite"
          >
            {/* Initial Welcome Date */}
            <div className="flex justify-center mt-4">
              <span className="text-sm bg-[var(--color-surface-container)]/50 px-4 py-1 rounded-full text-[var(--color-on-surface-variant)] font-medium">Today, your space</span>
            </div>

            {/* Welcome state */}
            {messages.length === 0 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="flex flex-col items-start max-w-[85%] md:max-w-[65%] gap-2 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                <div className="chat-bubble-ai bg-[var(--color-sage-soft)] p-5 rounded-2xl shadow-sm border border-[var(--color-primary)]/5 text-[var(--color-on-surface)] leading-relaxed">
                  <p className="mb-2">Namaste, dost. I'm Mitra, your calm space in the middle of all the noise. <span className="text-[var(--color-primary)] font-semibold">"Yaar, tension mat lo"</span>—I'm here to listen, whether you're stressed about exams, feeling burnt out, or just need to vent.</p>
                  <p>{welcome}</p>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-on-surface-variant)] font-bold ml-2">Mitra • Just now</span>

                <div className="flex flex-wrap gap-2 py-4">
                  {chips.map((c, i) => (
                    <motion.button key={i}
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => sendMessage(c)}
                      className="bg-[var(--color-surface)] border border-[var(--color-outline-variant)]/30 px-4 py-2 rounded-full text-sm font-medium hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300"
                    >"{c}"</motion.button>
                  ))}
                </div>

                {/* Daily quote */}
                {todayQuote && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="mt-4 p-4 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary-container)]/5 border border-[var(--color-border)]"
                  >
                    <p className="text-sm text-[var(--color-text-2)] leading-relaxed italic">
                      "{todayQuote.text}"
                    </p>
                    <p className="text-xs text-[var(--color-text-3)] mt-2">— {todayQuote.author}</p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        </div>
      </main>

      {/* Scroll to bottom button */}
      <AnimatePresence>
        {showScrollBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            onClick={() => scrollToBottom()}
            className="absolute bottom-28 right-6 z-40 w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white shadow-lg border-none cursor-pointer"
            aria-label="Scroll to latest message"
          >
            <ChevronDown size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Input ── */}
      <InputBar onSend={sendMessage} disabled={isTyping} />

      {/* ── Breathing nudge after extended chat ── */}
      <BreathingNudge />
    </div>
  )
}
