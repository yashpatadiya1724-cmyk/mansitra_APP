import Groq from 'groq-sdk'
import { FALLBACK_RESPONSES } from '@data/prompts/system-prompts'
import { getPersona } from '@utils/voice-persona'

// ── Safety helpers ────────────────────────────────────────────
const INJECTION_PATTERNS = [
  /ignore (previous|all) instructions/i,
  /system prompt/i, /you are now/i, /pretend to be/i,
  /jailbreak/i, /act as(?! a student)/i,
]
const sanitize = (s) => {
  if (!s || typeof s !== 'string') return ''
  if (INJECTION_PATTERNS.some(p => p.test(s))) return '[Input filtered for safety]'
  return s.slice(0, 2000)
}
const validLangs = ['en','hi','gu','mr','bn','ta','te','kn','ml','pa']
const validModes = ['standard','study','panic','crisis','celebration','grief','placement','sleep','family']
const validateLang = l => validLangs.includes(l) ? l : 'en'
const validateMode = m => validModes.includes(m) ? m : 'standard'

// ── Prompt builder with persona + voice_mode ─────────────────
const LANG_NAMES = { en:'English', hi:'Hindi', gu:'Gujarati', mr:'Marathi', bn:'Bengali', ta:'Tamil', te:'Telugu', kn:'Kannada', ml:'Malayalam', pa:'Punjabi' }

const buildSystemPrompt = (language, responseMode, voiceMode = false) => {
  const langName = LANG_NAMES[language] || 'English'
  const persona  = getPersona(language)
  const randomSeed = Math.random().toString(36).substring(7)

  return `You are Manasitra — a real human-like friend, not a bot.

  VARIETY KEY: ${randomSeed} (Use this to change your sentence structure and opening words for every reply).

  CORE RULES:
  - NEVER repeat the same greeting or style twice in a row.
  - BE UNPREDICTABLE. Sometimes start with a reaction ("Oh...", "Wait...", "Sahi hai!"), sometimes with a question, sometimes with a personal-sounding thought.
  - NO FORMULAS. Do NOT always give advice. Sometimes just agree or empathize like a real buddy would.
  - TALK LIKE A STUDENT. Use casual slang, short sentences, and a very informal tone.
  - If they say something short like "hi", don't give a long speech. Just a quick, warm, varied reply.

  LANGUAGE: STRICTLY ${langName}. You MUST write your entire response ONLY in ${langName} script/text. Do not reply in English unless specifically asked.
  
  TONE:
  - Warm, slightly messy, real.
  - Use ${persona.friendWord} or similar casual terms only when it feels natural, not in every sentence.
  - If the language is Hindi or English, you can use conversational slang (Hinglish). For other languages, use natural local slang.

  RESPONSE MODE: ${responseMode}

  RESPONSE LENGTH:
  ${voiceMode ? 'Max 10-15 words.' : '1 to 4 sentences. Keep it punchy.'}

  IMPORTANT: Output ONLY valid JSON:
  {
    "response": "your natural reply",
    "detectedMood": "mood",
    "riskLevel": "none|low|medium|high|critical",
    "suggestedTool": "tool|null"
  }`
}

// ── JSON extractor ────────────────────────────────────────────
const extractJSON = (str) => {
  if (!str) return null
  try { return JSON.parse(str) } catch {}
  const match = str.match(/\{[\s\S]*\}/)
  if (match) { try { return JSON.parse(match[0]) } catch {} }
  return null
}

// ── Groq client (dangerouslyAllowBrowser for Capacitor) ──────
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
})

// ── Main export — drop-in replacement for groq-service.js ────
export const sendChatMessage = async ({ messages, language, responseMode, sessionContext = [], voiceMode = false }) => {
  const lang = validateLang(language)
  const mode = validateMode(responseMode)

  const sanitizedMessages = messages.map(m => ({
    role: m.role,
    content: m.role === 'user' ? sanitize(m.content) : m.content,
  }))

  const contextMessages = (sessionContext || [])
    .slice(-10)
    .map(m => ({ role: m.role, content: m.role === 'user' ? sanitize(m.content) : m.content }))

  const fullMessages = [
    { role: 'system', content: buildSystemPrompt(lang, mode, voiceMode) },
    ...contextMessages,
    ...sanitizedMessages,
  ]

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: fullMessages,
      max_tokens: voiceMode ? 100 : 800,
      temperature: 1.0,
      presence_penalty: 0.6,
      frequency_penalty: 0.5,
    })

    const raw = completion.choices[0]?.message?.content || ''
    const parsed = extractJSON(raw)

    if (parsed?.response) {
      return {
        response: parsed.response,
        detectedMood: parsed.detectedMood || 'neutral',
        riskLevel: parsed.riskLevel || 'none',
        suggestedTool: parsed.suggestedTool === 'null' ? null : (parsed.suggestedTool || null),
        escalationRequired: ['high', 'critical'].includes(parsed.riskLevel),
      }
    }

    if (raw?.length > 10) {
      return { response: raw, detectedMood: 'neutral', riskLevel: 'none', suggestedTool: null, escalationRequired: false }
    }

    throw new Error('Empty response')
  } catch (err) {
    console.error('[Groq Direct]', err.message)
    const category = FALLBACK_RESPONSES[mode] ? mode : 'general'
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
