import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import { useSpeech } from '@hooks/use-speech'
import { useSpeaker } from '@hooks/use-speaker'
import { useLanguageStore } from '@store/language-store'
import { useSessionStore } from '@store/session-store'
import { useSafetyStore } from '@store/safety-store'
import { useGardenStore, XP_REWARDS } from '@store/garden-store'
import { sendChatMessage, getFallbackResponse } from '@utils/groq-service'
import { classifyRiskFromKeywords, detectResponseMode, sanitizeUserInput } from '@utils/safety-classifier'
import { RISK_LEVELS } from '@/app/config/constants'
import { ManasitaLogo } from '@components/logo'

const VOICE_PROMPTS = {
  en: ['Tell me what\'s on your mind...', 'I\'m listening...', 'How are you feeling?', 'Talk to me...'],
  hi: ['बताओ क्या चल रहा है...', 'मैं सुन रहा हूँ...', 'कैसा महसूस हो रहा है?', 'बात करो मुझसे...'],
  gu: ['કહો શું ચાલી રહ્યું છે...', 'હું સાંભળી રહ્યો છું...', 'કેવું લાગે છે?'],
  mr: ['सांगा काय चालू आहे...', 'मी ऐकतो आहे...', 'कसं वाटतंय?'],
}

const Waveform = ({ active }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 48 }}>
    {[0.4, 0.7, 1, 0.8, 0.5, 0.9, 0.6, 1, 0.7, 0.4, 0.8, 0.5].map((h, i) => (
      <motion.div key={i}
        animate={active
          ? { scaleY: [h, h * 0.3, h * 1.2, h * 0.5, h], opacity: [0.6, 1, 0.8, 1, 0.6] }
          : { scaleY: 0.15, opacity: 0.3 }}
        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.07, ease: 'easeInOut' }}
        style={{ width: 4, height: 40, borderRadius: 4, transformOrigin: 'center',
          background: active ? 'linear-gradient(180deg, #7DD4C8 0%, #4A7C6F 100%)' : 'var(--border)' }}
      />
    ))}
  </div>
)

const MicOrb = ({ listening, onClick }) => (
  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {listening && [1, 2, 3].map(i => (
      <motion.div key={i}
        animate={{ scale: [1, 1.8 + i * 0.3], opacity: [0.4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3, ease: 'easeOut' }}
        style={{ position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: 'rgba(74,124,111,0.3)' }}
      />
    ))}
    <motion.button onClick={onClick} whileTap={{ scale: 0.92 }}
      style={{
        width: 100, height: 100, borderRadius: '50%', border: 'none', cursor: 'pointer',
        background: listening ? 'linear-gradient(135deg, #4A7C6F 0%, #7DD4C8 100%)' : 'var(--surface)',
        boxShadow: listening ? '0 8px 32px rgba(74,124,111,0.5)' : '0 4px 20px rgba(0,0,0,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `2px solid ${listening ? 'rgba(125,212,200,0.5)' : 'var(--border)'}`,
      }}
    >
      {listening ? <MicOff size={36} style={{ color: 'white' }} /> : <Mic size={36} style={{ color: 'var(--primary)' }} />}
    </motion.button>
  </div>
)

export const VoiceAssistantPage = () => {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const prompts = VOICE_PROMPTS[lang] || VOICE_PROMPTS.en

  const { isListening, isSupported, error, startListening, stopListening } = useSpeech()
  const { speak, stop: stopSpeaking } = useSpeaker()
  const { selectedLanguage } = useLanguageStore()
  const { addMessage, setTyping, setResponseMode, getContextMessages } = useSessionStore()
  const messages = useSessionStore(s => s.messages)
  const isTyping = useSessionStore(s => s.isTyping)
  const { setRiskLevel, showCrisisScreen } = useSafetyStore()
  const { addXP, recordMessage } = useGardenStore()

  const [transcript, setTranscript] = useState('')
  const [status, setStatus] = useState('idle')
  const [lastAI, setLastAI] = useState('')
  const [ttsOn, setTtsOn] = useState(localStorage.getItem('manasitra_tts_enabled') !== 'false')
  const [promptIdx, setPromptIdx] = useState(0)
  const prevMsgCount = useRef(0)

  // Rotate idle prompt
  useEffect(() => {
    if (status !== 'idle') return
    const t = setInterval(() => setPromptIdx(i => (i + 1) % prompts.length), 3000)
    return () => clearInterval(t)
  }, [status, prompts.length])

  // Watch for new AI message
  useEffect(() => {
    if (messages.length > prevMsgCount.current) {
      const latest = messages[messages.length - 1]
      if (latest?.role === 'assistant' && latest?.content) {
        setLastAI(latest.content)
        setTranscript('')
        setStatus('speaking')
        if (ttsOn) {
          speak(latest.content, selectedLanguage)  // pass language for correct persona
          const ms = Math.max(3000, latest.content.split(' ').length * 400)
          setTimeout(() => setStatus('idle'), ms)
        } else {
          setTimeout(() => setStatus('idle'), 2000)
        }
      }
    }
    prevMsgCount.current = messages.length
  }, [messages])

  // Show thinking when AI is processing
  useEffect(() => {
    if (isTyping) setStatus('thinking')
  }, [isTyping])

  // Core send function — directly calls Groq, no hook dependency
  const doSend = useCallback(async (text) => {
    const sanitized = sanitizeUserInput(text.trim())
    if (!sanitized) return

    const clientRisk = classifyRiskFromKeywords(sanitized)
    if (clientRisk === RISK_LEVELS.CRITICAL) {
      setRiskLevel(RISK_LEVELS.CRITICAL)
      showCrisisScreen()
    }

    const mode = detectResponseMode(sanitized)
    setResponseMode(mode)

    addMessage({ id: crypto.randomUUID(), role: 'user', content: sanitized, timestamp: Date.now() })
    setTyping(true)
    recordMessage()

    try {
      const context = getContextMessages()
      const data = await sendChatMessage({
        messages: [{ role: 'user', content: sanitized }],
        language: selectedLanguage,
        responseMode: mode,
        sessionContext: context.slice(0, -1),
        voiceMode: true,  // shorter responses for voice
      })

      addMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.response,
        timestamp: Date.now(),
        detectedMood: data.detectedMood,
        riskLevel: data.riskLevel,
        suggestedTool: data.suggestedTool,
      })

      if (data.riskLevel === RISK_LEVELS.CRITICAL) {
        setRiskLevel(RISK_LEVELS.CRITICAL)
        showCrisisScreen()
      } else if (data.riskLevel) {
        setRiskLevel(data.riskLevel)
      }
    } catch (err) {
      console.error('[Voice]', err.message)
      const fallback = getFallbackResponse('anxious', selectedLanguage)
      addMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: fallback.response,
        timestamp: Date.now(),
        isFallback: true,
      })
    } finally {
      setTyping(false)
    }
  }, [selectedLanguage, addMessage, setTyping, setResponseMode, getContextMessages, setRiskLevel, showCrisisScreen, recordMessage])

  const handleMicClick = async () => {
    if (isListening) {
      const final = await stopListening()
      if (final) {
        setTranscript(final)
        setStatus('thinking')
        addXP(XP_REWARDS.voice_session, 'voice')
        await doSend(final)
      } else {
        setStatus('idle')
      }
    } else {
      if (status === 'speaking') stopSpeaking()
      setTranscript('')
      setStatus('listening')
      startListening(
        async (final) => {
          setTranscript(final)
          setStatus('thinking')
          addXP(XP_REWARDS.voice_session, 'voice')
          await doSend(final)
        },
        (interim) => setTranscript(interim)
      )
    }
  }

  const toggleTTS = () => {
    const next = !ttsOn
    setTtsOn(next)
    localStorage.setItem('manasitra_tts_enabled', String(next))
    if (!next) stopSpeaking()
  }

  const statusText = {
    idle:     prompts[promptIdx],
    listening:'Bol raha hoon...',
    thinking: 'Soch raha hoon...',
    speaking: 'Bol raha hoon...',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', transition: 'background 0.5s ease',
        background: status === 'listening'
          ? 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(74,124,111,0.15) 0%, transparent 70%)'
          : status === 'speaking'
          ? 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(126,186,168,0.12) 0%, transparent 70%)'
          : 'radial-gradient(ellipse 50% 40% at 50% 60%, rgba(74,124,111,0.06) 0%, transparent 70%)',
      }}/>

      {/* Header */}
      <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ManasitaLogo size={36} />
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Voice Mode</p>
            <p style={{ fontSize: 11, color: 'var(--text-3)' }}>Bolke baat karo</p>
          </div>
        </div>
        <button onClick={toggleTTS}
          style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: ttsOn ? 'var(--primary)' : 'var(--text-3)' }}
        >
          {ttsOn ? <Volume2 size={16}/> : <VolumeX size={16}/>}
        </button>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 24px', position: 'relative', zIndex: 1 }}>

        {/* AI reply bubble */}
        <AnimatePresence mode="wait">
          {lastAI && (
            <motion.div key={lastAI.slice(0, 20)}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              style={{
                width: '100%', maxWidth: 360, padding: '18px 20px', borderRadius: 20,
                background: 'white', border: '1px solid rgba(74,124,111,0.15)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: 32,
                maxHeight: 180, overflowY: 'auto',
              }}
            >
              <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.7 }}>{lastAI}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Waveform */}
        <div style={{ marginBottom: 32 }}>
          <Waveform active={isListening || status === 'speaking'} />
        </div>

        {/* Mic orb */}
        <MicOrb listening={isListening} onClick={handleMicClick} />

        {/* Status text */}
        <AnimatePresence mode="wait">
          <motion.p key={status + promptIdx}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            style={{ marginTop: 24, fontSize: 15, color: 'var(--text-2)', textAlign: 'center', fontStyle: status === 'idle' ? 'italic' : 'normal' }}
          >
            {statusText[status]}
          </motion.p>
        </AnimatePresence>

        {/* Transcript preview */}
        <AnimatePresence>
          {transcript && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ marginTop: 16, padding: '10px 16px', borderRadius: 12, background: 'rgba(74,124,111,0.08)', border: '1px solid rgba(74,124,111,0.2)', maxWidth: 320, textAlign: 'center' }}
            >
              <p style={{ fontSize: 14, color: 'var(--primary)', fontStyle: 'italic' }}>"{transcript}"</p>
            </motion.div>
          )}
        </AnimatePresence>

        {error && <p style={{ marginTop: 12, fontSize: 12, color: 'var(--danger)', textAlign: 'center' }}>{error}</p>}

        {status === 'idle' && isSupported && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            style={{ marginTop: 40, fontSize: 12, color: 'var(--text-3)', textAlign: 'center' }}
          >
            Mic dabao aur bolo
          </motion.p>
        )}
        {status === 'idle' && !isSupported && (
          <p style={{ marginTop: 40, fontSize: 12, color: 'var(--danger)', textAlign: 'center' }}>
            Voice not supported on this device
          </p>
        )}
      </div>

      {/* Recent messages */}
      {messages.length > 0 && (
        <div style={{ padding: '0 20px 100px', maxHeight: 200, overflowY: 'auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Recent</p>
          {messages.slice(-4).map((m, i) => (
            <div key={m.id || i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 6 }}>
              <div style={{
                maxWidth: '80%', padding: '8px 12px', borderRadius: 12, fontSize: 13,
                background: m.role === 'user' ? 'var(--primary)' : 'white',
                color: m.role === 'user' ? 'white' : 'var(--text)',
                border: m.role === 'user' ? 'none' : '1px solid var(--border)',
              }}>
                {m.content?.slice(0, 100)}{m.content?.length > 100 ? '...' : ''}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
