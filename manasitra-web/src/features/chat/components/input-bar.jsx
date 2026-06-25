import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, Mic, MicOff, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useNetworkStatus } from '@hooks/use-network-status'
import { useSafetyStore } from '@store/safety-store'
import { useSpeech } from '@hooks/use-speech'
import { motion, AnimatePresence } from 'framer-motion'
import { useGardenStore, XP_REWARDS } from '@store/garden-store'

export const InputBar = ({ onSend, disabled }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [interimText, setInterimText] = useState('')
  const isOnline = useNetworkStatus()
  const showCrisisScreen = useSafetyStore(s => s.showCrisisScreen)
  const ref = useRef(null)
  const { isListening, isSupported, error, startListening, stopListening } = useSpeech()
  const { addXP } = useGardenStore()

  const canSend = text.trim() && !disabled && isOnline

  const send = () => {
    if (!canSend) return
    onSend(text)
    setText('')
    setInterimText('')
    ref.current?.focus()
  }

  const handleMic = async () => {
    if (isListening) {
      const final = await stopListening()
      if (final) {
        setText(prev => {
          const trimmed = prev.trim()
          return trimmed ? `${trimmed} ${final}` : final
        })
        setInterimText('')
        addXP(XP_REWARDS.voice_session, 'voice')
        ref.current?.focus()
      }
      return
    }

    startListening(
      // Final result — append to existing text
      (final) => {
        setText(prev => {
          const trimmed = prev.trim()
          return trimmed ? `${trimmed} ${final}` : final
        })
        setInterimText('')
        addXP(XP_REWARDS.voice_session, 'voice')
        ref.current?.focus()
      },
      // Interim result — show as preview
      (interim) => {
        setInterimText(interim)
      }
    )
  }

  // When listening stops, commit any remaining interim text
  // Use a ref to track if onResult already handled it
  useEffect(() => {
    if (!isListening && interimText) {
      // Only append if it wasn't already committed by onResult
      setText(prev => {
        const trimmed = prev.trim()
        // Avoid appending if the interim text is already at the end
        if (trimmed.endsWith(interimText.trim())) return prev
        return trimmed ? `${trimmed} ${interimText}` : interimText
      })
      setInterimText('')
    }
  }, [isListening]) // intentionally exclude interimText to avoid loop

  const displayText = text + (interimText ? (text ? ' ' : '') + interimText : '')

  return (
    <div style={{
      flexShrink: 0, padding: '12px 20px 16px',
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      position: 'relative', zIndex: 2,
    }}>

      {/* Offline banner */}
      {!isOnline && (
        <div style={{
          textAlign: 'center', fontSize: 12, color: 'var(--warning)', marginBottom: 8,
          padding: '6px 12px', borderRadius: 8,
          background: 'rgba(240,184,96,0.07)', border: '1px solid rgba(240,184,96,0.2)',
        }}>{t('errors.network')}</div>
      )}

      {/* Mic error banner */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontSize: 12, color: 'var(--danger)', marginBottom: 8,
              padding: '7px 12px', borderRadius: 8,
              background: 'rgba(232,112,144,0.07)', border: '1px solid rgba(232,112,144,0.2)',
            }}
          >
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Listening indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
              padding: '7px 14px', borderRadius: 10,
              background: 'rgba(232,112,144,0.08)', border: '1px solid rgba(232,112,144,0.25)',
            }}
          >
            {/* Animated pulse rings */}
            <div style={{ position: 'relative', width: 16, height: 16, flexShrink: 0 }}>
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--danger)' }}
              />
              <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: 'var(--danger)' }} />
            </div>
            <span style={{ fontSize: 13, color: 'var(--danger)', fontWeight: 500 }}>
              Listening{interimText ? `: "${interimText}"` : '...'}
            </span>
            <button onClick={stopListening}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', padding: 2 }}
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', alignItems: 'flex-end', gap: 10 }}>

        {/* Crisis button */}
        <button onClick={showCrisisScreen} aria-label={t('chat.need_help')} title={t('chat.need_help')}
          className="btn-icon"
          style={{ border: 'none', background: 'linear-gradient(135deg, #E8734A 0%, #D4523A 100%)', color: 'white', flexShrink: 0, borderRadius: 24, fontWeight: 700, fontSize: 11, letterSpacing: '0.05em' }}
        >SOS</button>

        {/* Textarea */}
        <div style={{ flex: 1, position: 'relative' }}>
          <textarea ref={ref}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder={isListening ? 'Listening...' : t('chat.placeholder')}
            disabled={disabled || !isOnline}
            rows={1}
            maxLength={2000}
            style={{
              width: '100%', padding: '12px 16px', borderRadius: 24,
              background: 'white',
              border: `1.5px solid ${isListening ? 'var(--danger)' : text ? 'var(--primary)' : 'var(--border)'}`,
              color: 'var(--text)', fontSize: 14, lineHeight: 1.55,
              resize: 'none', outline: 'none', fontFamily: 'var(--font-body)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: isListening
                ? '0 0 0 3px rgba(239,68,68,0.10)'
                : text ? '0 0 0 3px var(--primary-soft)' : 'none',
              minHeight: 44, maxHeight: 120, overflowY: 'auto',
            }}
            autoComplete="off"
          />
          {/* Character counter — only show when approaching limit */}
          {text.length > 1800 && (
            <span style={{ position: 'absolute', bottom: 6, right: 10, fontSize: 10, color: text.length > 1950 ? 'var(--danger)' : 'var(--text-3)' }}>
              {2000 - text.length}
            </span>
          )}
          {/* Interim text overlay hint */}
          {isListening && interimText && !text && (
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              padding: '12px 16px', fontSize: 14, lineHeight: 1.55,
              color: 'rgba(232,112,144,0.6)', pointerEvents: 'none',
              fontStyle: 'italic', overflow: 'hidden',
            }}>
              {interimText}
            </div>
          )}
        </div>

        {/* Mic button — only shown if supported */}
        {isSupported && (
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={handleMic}
            disabled={disabled || !isOnline}
            aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
            title={isListening ? 'Stop listening' : 'Speak to type'}
            style={{
              width: 44, height: 44, borderRadius: 24, flexShrink: 0,
              border: isListening
                ? '1.5px solid rgba(239,68,68,0.5)'
                : '1.5px solid var(--border)',
              background: isListening
                ? 'rgba(239,68,68,0.1)'
                : 'white',
              color: isListening ? 'var(--danger)' : 'var(--text-2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: disabled || !isOnline ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: isListening ? '0 0 0 3px rgba(239,68,68,0.10)' : 'none',
            }}
          >
            {isListening
              ? <MicOff size={17} />
              : <Mic size={17} />
            }
          </motion.button>
        )}

        {/* Send button */}
        <motion.button whileTap={{ scale: canSend ? 0.94 : 1 }} onClick={send} disabled={!canSend}
          aria-label={t('chat.send')}
          style={{
            width: 44, height: 44, borderRadius: 24, flexShrink: 0,
            border: 'none', cursor: canSend ? 'pointer' : 'not-allowed',
            background: canSend
              ? 'var(--primary)'
              : 'var(--surface-2)',
            color: canSend ? 'white' : 'var(--text-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
            boxShadow: canSend ? '0 4px 16px var(--primary-glow)' : 'none',
          }}
        >
          {disabled
            ? <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', animation: 'spin 0.8s linear infinite' }} />
            : <Send size={17} />
          }
        </motion.button>
      </div>

      {/* Voice Mode Button Link */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
        <motion.button 
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/voice')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 20px', borderRadius: 20,
            background: 'var(--primary-soft)', border: '1.5px solid var(--primary)',
            color: 'var(--primary)', fontWeight: 600, fontSize: 13,
            cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          <Mic size={14} /> Start Voice Mode (Talk to Mansitra)
        </motion.button>
      </div>

      <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>
        Enter to send · Shift+Enter for new line
        {isSupported && ' · tap mic to speak'}
        {' · SOS for immediate help'}
      </p>
    </div>
  )
}
