import { RISK_LEVELS } from '@/app/config/constants'

export const processAIResponse = (raw) => {
  try {
    // Try to parse JSON response
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
    return {
      response: parsed.response || parsed.message || raw,
      detectedMood: parsed.detectedMood || 'neutral',
      riskLevel: parsed.riskLevel || RISK_LEVELS.NONE,
      suggestedTool: parsed.suggestedTool || null,
      escalationRequired: parsed.escalationRequired || false,
    }
  } catch {
    // If not JSON, treat as plain text response
    return {
      response: raw,
      detectedMood: 'neutral',
      riskLevel: RISK_LEVELS.NONE,
      suggestedTool: null,
      escalationRequired: false,
    }
  }
}
