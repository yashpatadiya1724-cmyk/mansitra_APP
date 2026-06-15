import { useCallback, useRef } from 'react'
import { useLanguageStore } from '@store/language-store'
import { getPersona } from '@utils/voice-persona'

const isNative = () =>
  typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.()

const TTS_KEY = 'manasitra_tts_enabled'

export const useSpeaker = () => {
  const { selectedLanguage } = useLanguageStore()
  const speakingRef = useRef(false)

  const isTTSEnabled = () => localStorage.getItem(TTS_KEY) !== 'false'

  const speak = useCallback(async (text, langOverride) => {
    if (!isTTSEnabled()) return
    if (!text?.trim()) return

    const lang = langOverride || selectedLanguage
    const persona = getPersona(lang)

    // Strip markdown
    const clean = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#{1,6}\s/g, '').trim()

    if (isNative()) {
      try {
        const { TextToSpeech } = await import('@capacitor-community/text-to-speech')
        await TextToSpeech.stop()
        await TextToSpeech.speak({
          text: clean,
          lang: persona.langCode,
          rate: persona.rate,
          pitch: persona.pitch,
          volume: 1.0,
          category: 'ambient',
        })
        speakingRef.current = true
      } catch (e) { console.warn('[TTS native]', e) }
    } else {
      if (!window.speechSynthesis) return
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(clean)
      utterance.lang   = persona.langCode
      utterance.rate   = persona.rate
      utterance.pitch  = persona.pitch
      utterance.volume = 1.0
      utterance.onend  = () => { speakingRef.current = false }
      speakingRef.current = true
      window.speechSynthesis.speak(utterance)
    }
  }, [selectedLanguage])

  const stop = useCallback(async () => {
    if (isNative()) {
      try {
        const { TextToSpeech } = await import('@capacitor-community/text-to-speech')
        await TextToSpeech.stop()
      } catch {}
    } else {
      window.speechSynthesis?.cancel()
    }
    speakingRef.current = false
  }, [])

  const isSpeaking = () => speakingRef.current

  return { speak, stop, isSpeaking, isTTSEnabled }
}
