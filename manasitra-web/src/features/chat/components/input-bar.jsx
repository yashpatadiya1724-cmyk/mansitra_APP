import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, Mic, MicOff, X, ShieldAlert } from 'lucide-react'
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
  useEffect(() => {
    if (!isListening && interimText) {
      setText(prev => {
        const trimmed = prev.trim()
        if (trimmed.endsWith(interimText.trim())) return prev
        return trimmed ? `${trimmed} ${interimText}` : interimText
      })
      setInterimText('')
    }
  }, [isListening])

  const [isFocused, setIsFocused] = useState(false)

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 bg-[var(--color-surface)]/90 backdrop-blur-xl pb-5 pt-4 px-5 border-t border-[var(--color-outline-variant)]/20">
      
      {/* Network / Error / Mic Banners */}
      <div className="max-w-[1200px] mx-auto px-12 relative bottom-2">
        {/* Offline banner */}
        {!isOnline && (
          <div className="text-center text-xs text-orange-600 mb-2 py-1.5 px-3 rounded-lg bg-orange-50 border border-orange-200">
            {t('errors.network')}
          </div>
        )}

        {/* Mic error banner */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              className="flex items-center justify-between text-xs text-[var(--color-error)] mb-2 py-1.5 px-3 rounded-lg bg-[var(--color-error)]/10 border border-[var(--color-error)]/20"
            >
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Listening indicator */}
        <AnimatePresence>
          {isListening && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-2 mb-2 py-1.5 px-3 rounded-lg bg-[var(--color-error)]/10 border border-[var(--color-error)]/25"
            >
              <div className="relative w-4 h-4 shrink-0">
                <motion.div
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-[var(--color-error)]"
                />
                <div className="absolute inset-[3px] rounded-full bg-[var(--color-error)]" />
              </div>
              <span className="text-sm text-[var(--color-error)] font-medium truncate">
                Listening{interimText ? `: "${interimText}"` : '...'}
              </span>
              <button onClick={stopListening} className="ml-auto bg-transparent border-none cursor-pointer text-[var(--color-error)] p-0.5 hover:bg-[var(--color-error)]/20 rounded-full">
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-[1200px] mx-auto flex items-center gap-3">
        {/* SOS Button placed beside the input wrapper for immediate access */}
        <button 
          onClick={showCrisisScreen} 
          aria-label={t('chat.need_help')} 
          title={t('chat.need_help')}
          className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl border-none shadow-sm transition-transform active:scale-95 bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold text-xs hover:shadow-md hover:from-orange-600 hover:to-red-600"
        >
          SOS
        </button>

        {/* Input Wrapper */}
        <div className={`relative flex-1 group transition-transform ${isFocused ? 'scale-[1.01]' : 'scale-100'}`}>
          {/* Text input area */}
          <textarea 
            ref={ref}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isListening ? 'Listening...' : t('chat.placeholder') || "Share what's on your mind, dost..."}
            disabled={disabled || !isOnline}
            rows={1}
            className={`w-full bg-[var(--color-warm-mist)] border-none rounded-2xl pl-5 pr-28 py-4 text-base focus:ring-2 focus:ring-[var(--color-primary-container)] transition-all placeholder:text-[var(--color-on-surface-variant)]/50 shadow-inner resize-none outline-none overflow-y-auto ${isListening ? 'ring-2 ring-[var(--color-error)]/50' : ''}`}
            style={{ minHeight: '56px', maxHeight: '120px' }}
            autoComplete="off"
          />

          {/* Action Buttons (Inside Input) */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {isSupported && (
              <button 
                onClick={handleMic}
                disabled={disabled || !isOnline}
                title="Voice Mode"
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors cursor-pointer ${isListening ? 'text-[var(--color-error)] bg-[var(--color-error)]/10' : 'text-[var(--color-on-surface-variant)] hover:bg-[var(--color-primary-container)]/10'}`}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
            )}
            
            <button 
              onClick={send}
              disabled={!canSend}
              title="Send"
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all cursor-pointer ${canSend ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-on-primary-container)] active:scale-90 shadow-md' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              {disabled && canSend ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <Send size={18} className={canSend ? 'text-white' : 'text-gray-500'} />
              )}
            </button>
          </div>
          
          {/* Interim text overlay hint */}
          {isListening && interimText && !text && (
            <div className="absolute inset-0 px-5 py-4 text-base text-[var(--color-error)]/60 pointer-events-none italic overflow-hidden whitespace-nowrap text-ellipsis">
              {interimText}
            </div>
          )}
        </div>
      </div>
      
      {/* Voice Mode Link */}
      <div className="flex justify-center mt-2">
         <motion.button 
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/voice')}
          className="text-[11px] text-[var(--color-primary)] font-semibold flex items-center gap-1 hover:underline"
         >
           <Mic size={12} /> Want to talk instead? Try immersive Voice Mode
         </motion.button>
      </div>

      <p className="text-center text-[10px] text-[var(--color-on-surface-variant)] mt-2 tracking-wide flex items-center justify-center gap-1">
        <ShieldAlert size={12} />
        YOUR CONVERSATION IS PRIVATE & SECURE. WE DON'T STORE DATA FOR ADVERTISING.
      </p>
    </footer>
  )
}
