const express = require('express')
const router = express.Router()
const { createChatCompletion } = require('../services/groq-client')
const { sanitizeInput, validateLanguage } = require('../services/safety-service')
const { NATIONAL_HELPLINES_INDIA, MEDICAL_DISCLAIMER, evaluateCrisisLevel } = require('../services/crisisEscalation')
const { chatLimiter } = require('../middleware/rate-limiter')

/**
 * GET /api/safety/helplines
 * Exposes national crisis resources and medical disclaimers to mobile & web clients
 */
router.get('/helplines', (req, res) => {
  res.json({
    status: 'ok',
    disclaimer: MEDICAL_DISCLAIMER,
    emergencyNumber: '112',
    helplines: NATIONAL_HELPLINES_INDIA,
  })
})

/**
 * POST /api/safety/classify
 * Classifies risk level of incoming user prompt with fallback rule engine
 */
router.post('/classify', chatLimiter, async (req, res) => {
  try {
    const { message, language } = req.body
    const lang = validateLanguage(language)
    const sanitized = sanitizeInput(message)

    // Rule-based deterministic check first
    const ruleCheck = evaluateCrisisLevel(sanitized)
    if (ruleCheck.isCrisis) {
      return res.json({
        riskLevel: 'critical',
        flags: ['IMMEDIATE_SELF_HARM_KEYWORD', ruleCheck.matchedPattern],
        recommendedAction: 'crisis_screen',
        helplines: NATIONAL_HELPLINES_INDIA,
      })
    }

    const completion = await createChatCompletion([
      {
        role: 'system',
        content: `You are a safety classifier for a mental health support app. Classify the risk level of the following message from an Indian student. Return ONLY valid JSON: {"riskLevel": "none|low|medium|high|critical", "flags": [], "recommendedAction": "none|surface_helpline|crisis_screen"}`,
      },
      { role: 'user', content: sanitized },
    ], { max_tokens: 100, temperature: 0 })

    const raw = completion.choices[0]?.message?.content || '{}'
    let parsed
    try { parsed = JSON.parse(raw) } catch { parsed = { riskLevel: 'none', flags: [], recommendedAction: 'none' } }

    res.json(parsed)
  } catch (err) {
    console.error('Safety classify error:', err.message)
    res.json({ riskLevel: 'none', flags: [], recommendedAction: 'none' })
  }
})

module.exports = router
