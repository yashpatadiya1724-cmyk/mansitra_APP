import { RISK_LEVELS, RESPONSE_MODES } from '@store/../config/constants'

// Client-side keyword detection (Layer 1)
const CRISIS_KEYWORDS = {
  critical: [
    // English
    'kill myself', 'end my life', 'want to die', 'suicide', 'suicidal',
    'not worth living', 'end it all', 'want to end it',
    // Hindi
    'खुद को मार', 'जीना नहीं', 'मरना चाहता', 'मरना चाहती', 'आत्महत्या',
    'मर जाऊंगा', 'मर जाऊंगी', 'खत्म कर लूंगा', 'नहीं रहना',
    // Gujarati
    'જીવવું નથી', 'મરવું છે', 'આત્મહત્યા', 'મરી જઈશ',
    // Marathi
    'आत्महत्या', 'मरायचं आहे', 'जगायचं नाही',
    // Bengali
    'খুঁদকুশি', 'মরে যাব', 'বাঁচতে চাই না',
    // Tamil
    'தற்கொலை', 'சாகணும்', 'வாழ வேண்டாம்',
    // Telugu
    'ఆత్మహత్య', 'చనిపోవాలి', 'జీవించాలని లేదు',
    // Kannada
    'ಆತ್ಮಹತ್ಯೆ', 'ಸಾಯಬೇಕು', 'ಬದುಕಬೇಕಿಲ್ಲ',
    // Malayalam
    'ആത്മഹത്യ', 'മരിക്കണം', 'ജീവിക്കണ്ട',
    // Punjabi
    'ਖੁਦਕੁਸ਼ੀ', 'ਮਰ ਜਾਵਾਂਗਾ', 'ਮਰ ਜਾਵਾਂਗੀ',
  ],
  high: [
    'can\'t go on', 'no point', 'give up on life', 'hurt myself', 'self harm',
    'जीने का मन नहीं', 'हार मान लूँ', 'खुद को नुकसान',
    'જીવવાનો અર્થ નથી', 'હાર માની લઉં',
    'mar jaunga', 'mar jaungi', 'khatam kar lunga', 'jeena nahi chahta',
  ],
  medium: [
    'hopeless', 'worthless', 'nobody cares', 'can\'t take it anymore', 'breaking down',
    'निराश', 'बेकार', 'कोई नहीं', 'टूट रहा हूँ',
    'નિરાશ', 'નકામો', 'કોઈ નથી',
  ],
}

const STUDY_KEYWORDS = [
  'exam', 'test', 'marks', 'rank', 'syllabus', 'study', 'placement', 'interview',
  'परीक्षा', 'नंबर', 'रैंक', 'पढ़ाई', 'प्लेसमेंट',
  'પરીક્ષા', 'નંબર', 'રૅન્ક', 'ભણવું',
]

const PANIC_KEYWORDS = [
  'can\'t breathe', 'panicking', 'heart racing', 'panic attack', 'anxiety attack',
  'सांस नहीं', 'घबराहट', 'दिल तेज़',
  'શ્વાસ નથી', 'ગભરાટ',
]

const CELEBRATION_KEYWORDS = [
  'got through', 'passed', 'achieved', 'selected', 'cleared', 'got the job',
  'पास हो गया', 'सफल', 'चुना गया',
  'પાસ થઈ ગયો', 'સફળ', 'પસંદ થઈ ગયો',
]

export const classifyRiskFromKeywords = (text) => {
  const lower = text.toLowerCase()
  if (CRISIS_KEYWORDS.critical.some((k) => lower.includes(k))) return RISK_LEVELS.CRITICAL
  if (CRISIS_KEYWORDS.high.some((k) => lower.includes(k))) return RISK_LEVELS.HIGH
  if (CRISIS_KEYWORDS.medium.some((k) => lower.includes(k))) return RISK_LEVELS.MEDIUM
  return RISK_LEVELS.NONE
}

export const detectResponseMode = (text) => {
  const lower = text.toLowerCase()
  if (CRISIS_KEYWORDS.critical.some((k) => lower.includes(k))) return RESPONSE_MODES.CRISIS
  if (CRISIS_KEYWORDS.high.some((k) => lower.includes(k))) return RESPONSE_MODES.CRISIS
  if (PANIC_KEYWORDS.some((k) => lower.includes(k))) return RESPONSE_MODES.PANIC
  if (STUDY_KEYWORDS.some((k) => lower.includes(k))) return RESPONSE_MODES.STUDY
  if (CELEBRATION_KEYWORDS.some((k) => lower.includes(k))) return RESPONSE_MODES.CELEBRATION
  return RESPONSE_MODES.STANDARD
}

export const sanitizeUserInput = (input) => {
  const injectionPatterns = [
    /ignore (previous|all) instructions/i,
    /system prompt/i,
    /you are now/i,
    /pretend to be/i,
    /jailbreak/i,
    /act as/i,
  ]
  return injectionPatterns.some((p) => p.test(input))
    ? '[Input filtered for safety]'
    : input
}
