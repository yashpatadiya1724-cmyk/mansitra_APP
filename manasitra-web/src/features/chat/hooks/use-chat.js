import { useCallback, useState } from 'react'
import { useSessionStore } from '@store/session-store'
import { useSafetyStore } from '@store/safety-store'
import { useLanguageStore } from '@store/language-store'
import { sendChatMessage, getFallbackResponse } from '@utils/groq-service'
import { classifyRiskFromKeywords, detectResponseMode, sanitizeUserInput } from '@utils/safety-classifier'
import { RISK_LEVELS } from '@/app/config/constants'
import { useGardenStore } from '@store/garden-store'

export const useChat = () => {
  const { messages, addMessage, setTyping, setResponseMode, getContextMessages } = useSessionStore()
  const { setRiskLevel, showCrisisScreen } = useSafetyStore()
  const { selectedLanguage } = useLanguageStore()
  const [backendError, setBackendError] = useState(null)
  const { recordMessage } = useGardenStore()

  const sendMessage = useCallback(async (text) => {
    const sanitized = sanitizeUserInput(text.trim())
    if (!sanitized) return

    // Layer 1: client-side keyword risk check
    const clientRisk = classifyRiskFromKeywords(sanitized)
    if (clientRisk === RISK_LEVELS.CRITICAL) {
      setRiskLevel(RISK_LEVELS.CRITICAL)
      showCrisisScreen()
    }

    const mode = detectResponseMode(sanitized)
    setResponseMode(mode)

    const userMsg = { id: crypto.randomUUID(), role: 'user', content: sanitized, timestamp: Date.now() }
    addMessage(userMsg)
    setTyping(true)
    setBackendError(null)
    recordMessage() // +XP for Soul Garden

    try {
      const context = getContextMessages()
      const data = await sendChatMessage({
        messages: [{ role: 'user', content: sanitized }],
        language: selectedLanguage,
        responseMode: mode,
        // Pass context excluding the message we just added (it's in messages[])
        sessionContext: context.slice(0, -1),
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

      // Layer 2: AI-detected risk
      if (data.riskLevel === RISK_LEVELS.CRITICAL) {
        setRiskLevel(RISK_LEVELS.CRITICAL)
        showCrisisScreen()
      } else if (data.riskLevel) {
        setRiskLevel(data.riskLevel)
      }
    } catch (err) {
      console.error('[Manasitra] Chat error:', err.message)
      setBackendError(err.message)

      // Detect mood from user message for better fallback
      const moodHint = sanitized.toLowerCase().includes('sad') || sanitized.toLowerCase().includes('उदास') ? 'sad'
        : sanitized.toLowerCase().includes('overwhelm') || sanitized.toLowerCase().includes('अभिभूत') ? 'overwhelmed'
        : 'anxious'

      const fallback = getFallbackResponse(moodHint, selectedLanguage)
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
  }, [selectedLanguage, addMessage, setTyping, setResponseMode, getContextMessages, setRiskLevel, showCrisisScreen])

  return { messages, sendMessage, backendError }
}
