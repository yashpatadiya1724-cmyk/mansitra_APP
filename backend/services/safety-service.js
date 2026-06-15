const INJECTION_PATTERNS = [
  /ignore (previous|all) instructions/i,
  /system prompt/i,
  /you are now/i,
  /pretend to be/i,
  /jailbreak/i,
  /act as(?! a student)/i,
]

const sanitizeInput = (input) => {
  if (!input || typeof input !== 'string') return ''
  if (INJECTION_PATTERNS.some((p) => p.test(input))) return '[Input filtered for safety]'
  return input.slice(0, 2000) // max length
}

const validateLanguage = (lang) => {
  const supported = ['en', 'hi', 'gu', 'mr', 'bn', 'ta', 'te', 'kn', 'ml', 'pa']
  return supported.includes(lang) ? lang : 'en'
}

const validateResponseMode = (mode) => {
  const valid = ['standard', 'study', 'panic', 'crisis', 'celebration', 'grief', 'placement', 'sleep', 'family']
  return valid.includes(mode) ? mode : 'standard'
}

module.exports = { sanitizeInput, validateLanguage, validateResponseMode }
