import { CapacitorHttp } from '@capacitor/core'
import { FALLBACK_RESPONSES, buildSystemPrompt } from '@data/prompts/system-prompts'

const sanitize = (s) => {
  if (!s || typeof s !== 'string') return ''
  return s.slice(0, 2000)
}

const validLangs = ['en','hi','gu','mr','bn','ta','te','kn','ml','pa']
const validateLang = l => validLangs.includes(l) ? l : 'en'

const getApiKey = () => {
  return import.meta.env.VITE_GROQ_API_KEY || ''
}

export const sendChatMessage = async ({ messages, language, responseMode, sessionContext = [], voiceMode = false }) => {
  const lang = validateLang(language)

  const lastUserMessage = messages.filter(m => m.role === 'user').pop()
  const userText = lastUserMessage ? sanitize(lastUserMessage.content) : ''

  const apiKey = getApiKey()
  if (!apiKey) {
    console.error('[Groq API] VITE_GROQ_API_KEY is not defined.')
  }

  try {
    const formattedMessages = messages.map(m => ({
      role: m.role,
      content: typeof m.content === 'string' ? sanitize(m.content) : ''
    })).filter(m => m.content)

    const response = await CapacitorHttp.post({
      url: 'https://api.groq.com/openai/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      data: {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: buildSystemPrompt(lang, responseMode)
          },
          ...formattedMessages
        ],
        temperature: 0.7,
        max_tokens: 800,
        response_format: { type: 'json_object' }
      }
    })

    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${JSON.stringify(response.data)}`)
    }

    // CapacitorHttp response.data is automatically parsed to object if JSON
    const responseData = response.data
    const contentString = responseData.choices?.[0]?.message?.content || '{}'
    const data = typeof contentString === 'string' ? JSON.parse(contentString) : contentString

    return {
      response: data.response || "No response",
      detectedMood: data.detectedMood || 'neutral',
      riskLevel: data.riskLevel || 'none',
      suggestedTool: data.suggestedTool || null,
      escalationRequired: data.riskLevel === 'high' || data.riskLevel === 'critical',
    }
  } catch (err) {
    console.error('[Groq API Error]', err.message)
    const category = FALLBACK_RESPONSES[responseMode] ? responseMode : 'general'
    const fallbacks = FALLBACK_RESPONSES[category]?.[lang] || FALLBACK_RESPONSES[category]?.en || FALLBACK_RESPONSES.general.en
    return {
      response: fallbacks[Math.floor(Math.random() * fallbacks.length)],
      detectedMood: 'neutral',
      riskLevel: 'none',
      suggestedTool: null,
      escalationRequired: false,
      isFallback: true,
    }
  }
}
