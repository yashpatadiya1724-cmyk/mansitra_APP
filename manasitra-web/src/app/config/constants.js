export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English',   nativeName: 'English',    script: 'Latin' },
  { code: 'hi', name: 'Hindi',     nativeName: 'हिंदी',       script: 'Devanagari' },
  { code: 'gu', name: 'Gujarati',  nativeName: 'ગુજરાતી',    script: 'Gujarati' },
  { code: 'mr', name: 'Marathi',   nativeName: 'मराठी',       script: 'Devanagari' },
  { code: 'bn', name: 'Bengali',   nativeName: 'বাংলা',       script: 'Bengali' },
  { code: 'ta', name: 'Tamil',     nativeName: 'தமிழ்',       script: 'Tamil' },
  { code: 'te', name: 'Telugu',    nativeName: 'తెలుగు',      script: 'Telugu' },
  { code: 'kn', name: 'Kannada',   nativeName: 'ಕನ್ನಡ',       script: 'Kannada' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം',     script: 'Malayalam' },
  { code: 'pa', name: 'Punjabi',   nativeName: 'ਪੰਜਾਬੀ',     script: 'Gurmukhi' },
]

export const MOOD_STATES = [
  { id: 'very_happy', emoji: '😄', color: '#F5C842' },
  { id: 'content', emoji: '😊', color: '#4CAF82' },
  { id: 'neutral', emoji: '😐', color: '#9E9B94' },
  { id: 'anxious', emoji: '😰', color: '#E8A045' },
  { id: 'sad', emoji: '😢', color: '#5B9BD5' },
  { id: 'overwhelmed', emoji: '😵', color: '#D05A72' },
  { id: 'exhausted', emoji: '😴', color: '#9B8FF0' },
]

export const RESPONSE_MODES = {
  STANDARD: 'standard',
  STUDY: 'study',
  PANIC: 'panic',
  CRISIS: 'crisis',
  CELEBRATION: 'celebration',
  GRIEF: 'grief',
}

export const RISK_LEVELS = {
  NONE: 'none',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
}

export const STORAGE_KEYS = {
  LANGUAGE: 'manasitra_language',
  THEME: 'manasitra_theme',
  MOOD_LOG: 'manasitra_mood_log',
  PROGRESS: 'manasitra_progress',
  DAILY_WINS: 'manasitra_daily_wins',
  ACCESSIBILITY: 'manasitra_accessibility',
  ONBOARDED: 'manasitra_onboarded',
  NICKNAME: 'manasitra_nickname',
  SHARED_DEVICE: 'manasitra_shared_device',
}

export const APP_VERSION = '1.0.0'
export const MAX_SESSION_MESSAGES = 5
export const MAX_NOTE_LENGTH = 100
export const MAX_TOKENS = 800
