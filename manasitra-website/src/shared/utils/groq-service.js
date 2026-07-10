// Re-export from groq-direct — calls Groq API directly, no backend needed
export { sendChatMessage } from './groq-direct.js'

import { FALLBACK_RESPONSES } from '@data/prompts/system-prompts'

export const getFallbackResponse = (detectedMood, language) => {
  const key = detectedMood || 'anxious'
  const fallbacks = FALLBACK_RESPONSES[key] || FALLBACK_RESPONSES.anxious
  return {
    response: fallbacks[language] || fallbacks.en,
    detectedMood: key,
    riskLevel: 'none',
    suggestedTool: null,
    isFallback: true,
  }
}
