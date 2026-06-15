import { useState, useRef, useCallback, useEffect } from 'react'
import { useLanguageStore } from '@store/language-store'

const SPEECH_LANG_MAP = {
  en: 'en-IN', hi: 'hi-IN', gu: 'gu-IN', mr: 'mr-IN',
  bn: 'bn-IN', ta: 'ta-IN', te: 'te-IN', kn: 'kn-IN',
  ml: 'ml-IN', pa: 'pa-IN',
}

const isNative = () =>
  typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.()

export const useSpeech = () => {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState(null)
  const recognitionRef = useRef(null)
  const { selectedLanguage } = useLanguageStore()
  const lang = SPEECH_LANG_MAP[selectedLanguage] || 'en-IN'

  useEffect(() => {
    if (isNative()) {
      setIsSupported(true)
    } else {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition
      setIsSupported(!!SR)
    }
  }, [])

  const startListening = useCallback(async (onResult, onInterim) => {
    setError(null)
    setIsListening(true)

    if (isNative()) {
      // ── Android: Capacitor Speech Recognition ──
      try {
        const { SpeechRecognition } = await import('@capacitor-community/speech-recognition')

        // Request permission first
        const perm = await SpeechRecognition.requestPermissions()
        if (perm.speechRecognition !== 'granted') {
          setError('Microphone permission denied. Please allow in settings.')
          setIsListening(false)
          return
        }

        // Remove old listeners
        await SpeechRecognition.removeAllListeners()

        // Listen for partial results
        await SpeechRecognition.addListener('partialResults', (data) => {
          const match = data.matches?.[0]
          if (match && onInterim) onInterim(match)
        })

        // Start listening
        await SpeechRecognition.start({
          language: lang,
          maxResults: 1,
          partialResults: true,
          popup: false,
        })

        // Poll for result — stop after 8 seconds max
        let attempts = 0
        const poll = setInterval(async () => {
          attempts++
          try {
            const status = await SpeechRecognition.getSupportedLanguages()
            // If still listening after 8s, stop
            if (attempts > 16) {
              clearInterval(poll)
              const result = await SpeechRecognition.stop()
              const final = result?.matches?.[0]
              if (final && onResult) onResult(final)
              setIsListening(false)
              await SpeechRecognition.removeAllListeners()
            }
          } catch { clearInterval(poll) }
        }, 500)

        // Listen for stop event
        await SpeechRecognition.addListener('listeningState', async (state) => {
          if (state.status === 'stopped') {
            clearInterval(poll)
            setIsListening(false)
            await SpeechRecognition.removeAllListeners()
          }
        })

      } catch (e) {
        console.error('[STT]', e)
        setError('Voice input failed. Try again.')
        setIsListening(false)
      }

    } else {
      // ── Web: Web Speech API ──
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SR) { setIsListening(false); return }

      if (recognitionRef.current) recognitionRef.current.stop()

      const recognition = new SR()
      recognitionRef.current = recognition
      recognition.lang = lang
      recognition.continuous = false
      recognition.interimResults = true
      recognition.maxAlternatives = 1

      recognition.onresult = (event) => {
        let interim = '', final = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const t = event.results[i][0].transcript
          if (event.results[i].isFinal) final += t
          else interim += t
        }
        if (interim && onInterim) onInterim(interim)
        if (final && onResult) onResult(final)
      }

      recognition.onerror = (event) => {
        setIsListening(false)
        if (event.error === 'not-allowed') setError('Microphone access denied.')
        else if (event.error !== 'no-speech') setError(`Voice error: ${event.error}`)
      }

      recognition.onend = () => setIsListening(false)

      try { recognition.start() } catch { setIsListening(false) }
    }
  }, [lang])

  const stopListening = useCallback(async () => {
    if (isNative()) {
      try {
        const { SpeechRecognition } = await import('@capacitor-community/speech-recognition')
        const result = await SpeechRecognition.stop()
        await SpeechRecognition.removeAllListeners()
        return result?.matches?.[0] || null
      } catch {}
    } else {
      recognitionRef.current?.stop()
      recognitionRef.current = null
    }
    setIsListening(false)
  }, [])

  useEffect(() => {
    return () => { recognitionRef.current?.stop() }
  }, [])

  return { isListening, isSupported, error, startListening, stopListening }
}
