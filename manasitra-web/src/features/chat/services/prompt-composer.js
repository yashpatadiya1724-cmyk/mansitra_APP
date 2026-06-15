import { buildSystemPrompt } from '@data/prompts/system-prompts'
import { MAX_SESSION_MESSAGES } from '@/app/config/constants'

export const composeMessages = ({ userMessage, sessionMessages, language, responseMode }) => {
  const systemPrompt = buildSystemPrompt(language, responseMode)
  const context = sessionMessages.slice(-MAX_SESSION_MESSAGES * 2)
  return [
    { role: 'system', content: systemPrompt },
    ...context,
    { role: 'user', content: userMessage },
  ]
}
