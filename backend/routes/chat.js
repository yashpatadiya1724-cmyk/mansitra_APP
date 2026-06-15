const express = require('express')
const router = express.Router()
const { createChatCompletion } = require('../services/groq-client')
const { buildSystemPrompt, hasCrisisKeyword } = require('../utils/prompt-builder')
const { sanitizeInput, validateLanguage, validateResponseMode } = require('../services/safety-service')
const { chatLimiter } = require('../middleware/rate-limiter')

const extractJSON = (str) => {
  if (!str) return null
  try { return JSON.parse(str) } catch {}
  const match = str.match(/\{[\s\S]*\}/)
  if (match) { try { return JSON.parse(match[0]) } catch {} }
  return null
}

router.post('/', chatLimiter, async (req, res) => {
  try {
    const { messages, language, responseMode, sessionContext = [], voice_mode = false } = req.body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages required' })
    }

    const lang = validateLanguage(language)
    const mode = validateResponseMode(responseMode)

    // Sanitize user messages
    const sanitizedMessages = messages.map(m => ({
      role: m.role,
      content: m.role === 'user' ? sanitizeInput(m.content) : m.content,
    }))

    // Client-side crisis pre-check
    const userText = sanitizedMessages.map(m => m.content).join(' ')
    const isCrisisInput = hasCrisisKeyword(userText)

    const systemPrompt = buildSystemPrompt(lang, isCrisisInput ? 'crisis' : mode, voice_mode)

    const contextMessages = sessionContext
      .slice(-6)
      .map(m => ({ role: m.role, content: m.role === 'user' ? sanitizeInput(m.content) : m.content }))

    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...contextMessages,
      ...sanitizedMessages,
    ]

    const completion = await createChatCompletion(fullMessages, {
      max_tokens: voice_mode ? 80 : 800,
      temperature: 0.85,
    })
    const raw = completion.choices[0]?.message?.content || ''
    const parsed = extractJSON(raw)

    // Check if AI flagged crisis
    const isCrisisResponse = raw.includes('CRISIS_DETECTED') || isCrisisInput

    if (parsed && parsed.response) {
      return res.json({
        response: parsed.response.replace('CRISIS_DETECTED', '').trim(),
        detectedMood: parsed.detectedMood || 'neutral',
        riskLevel: isCrisisResponse ? 'critical' : (parsed.riskLevel || 'none'),
        suggestedTool: parsed.suggestedTool === 'null' ? null : (parsed.suggestedTool || null),
        escalationRequired: isCrisisResponse || ['high', 'critical'].includes(parsed.riskLevel),
        languageVerified: true,
      })
    }

    if (raw && raw.length > 10) {
      return res.json({
        response: raw.replace('CRISIS_DETECTED', '').trim(),
        detectedMood: 'neutral',
        riskLevel: isCrisisResponse ? 'critical' : 'none',
        suggestedTool: null,
        escalationRequired: isCrisisResponse,
        languageVerified: true,
      })
    }

    res.status(500).json({ error: 'Empty response from AI' })

  } catch (err) {
    console.error('[Chat] Error:', err.message)
    res.status(500).json({ error: err.message || 'AI service temporarily unavailable' })
  }
})

module.exports = router
