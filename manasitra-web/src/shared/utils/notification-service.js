// ── Manasitra Notification Service ───────────────────────────
// Uses @capacitor/local-notifications for Android native notifications
// Falls back to Web Notification API for browser

const EXAM_STORAGE_KEY = 'manasitra_exams'
const NOTIF_GRANTED_KEY = 'manasitra_notif_granted'
const NOTIF_INTERVAL_KEY = 'manasitra_notif_interval_id'

// ── Detect if running in Capacitor native app ─────────────────
const isNative = () =>
  typeof window !== 'undefined' &&
  window.Capacitor?.isNativePlatform?.()

// ── Motivational messages ─────────────────────────────────────
const MOTIVATIONAL = {
  en: [
    "You've got this! One step at a time. 💪",
    "Take a deep breath. You are doing better than you think.",
    "Every minute you study is an investment in your future.",
    "Feeling stuck? Try the breathing tool — it helps!",
    "You are stronger than your exam anxiety. Keep going!",
    "Small progress is still progress. Be proud of yourself.",
    "Your hard work will pay off. Stay consistent!",
    "Remember to drink water and take a short break.",
    "You are not alone. Manasitra is here for you.",
    "One topic at a time. You can do this!",
  ],
  hi: [
    "तुम कर सकते हो! एक कदम एक बार में।",
    "गहरी सांस लो। तुम सोचते हो उससे बेहतर कर रहे हो।",
    "हर मिनट की पढ़ाई तुम्हारे भविष्य में निवेश है।",
    "अटके हुए हो? Breathing tool try करो!",
    "तुम अपनी exam anxiety से ज़्यादा मज़बूत हो।",
    "छोटी progress भी progress है। खुद पर गर्व करो।",
    "तुम्हारी मेहनत रंग लाएगी। Consistent रहो!",
    "पानी पियो और थोड़ा break लो।",
    "तुम अकेले नहीं हो। Manasitra तुम्हारे साथ है।",
    "एक topic एक बार में। तुम यह कर सकते हो!",
  ],
}

const getDaysLeft = (dateStr) => {
  const target = new Date(dateStr)
  target.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.ceil((target - today) / 86400000)
}

const getExams = () => {
  try { return JSON.parse(localStorage.getItem(EXAM_STORAGE_KEY) || '[]') }
  catch { return [] }
}

const getLang = () => {
  try {
    const raw = localStorage.getItem('manasitra_language')
    return raw ? JSON.parse(raw) : 'en'
  } catch { return 'en' }
}

const getMotivational = () => {
  const lang = getLang()
  const msgs = MOTIVATIONAL[lang] || MOTIVATIONAL.en
  return msgs[Math.floor(Math.random() * msgs.length)]
}

const getNotifContent = () => {
  const exams = getExams().filter(e => getDaysLeft(e.date) >= 0)
  const lang = getLang()

  if (exams.length > 0) {
    const next = [...exams].sort((a, b) => new Date(a.date) - new Date(b.date))[0]
    const days = getDaysLeft(next.date)

    if (lang === 'hi') {
      if (days === 0) return { title: `आज ${next.name} है! 🎯`, body: 'तुम तैयार हो। अपना best दो!' }
      if (days === 1) return { title: `कल ${next.name} है! 📚`, body: 'आज रात अच्छे से सो जाओ।' }
      if (days <= 3) return { title: `${next.name} — सिर्फ ${days} दिन!`, body: 'Focus करो। एक topic एक बार में।' }
      if (days <= 7) return { title: `${next.name} — ${days} दिन बाकी`, body: getMotivational() }
    }

    if (days === 0) return { title: `${next.name} is TODAY! 🎯`, body: 'You are ready. Give it your best!' }
    if (days === 1) return { title: `${next.name} is TOMORROW! 📚`, body: 'Get a good sleep tonight.' }
    if (days <= 3) return { title: `${next.name} — only ${days} days left!`, body: 'Stay focused. One topic at a time.' }
    if (days <= 7) return { title: `${next.name} — ${days} days to go`, body: getMotivational() }
  }

  return { title: 'Manasitra 🌸', body: getMotivational() }
}

// ── Send notification (native or web) ────────────────────────
const sendNotif = async (title, body) => {
  if (isNative()) {
    try {
      const { LocalNotifications } = await import('@capacitor/local-notifications')
      await LocalNotifications.schedule({
        notifications: [{
          id: Math.floor(Math.random() * 100000),
          title,
          body,
          smallIcon: 'ic_launcher',
          iconColor: '#4A7C6F',
          schedule: { at: new Date(Date.now() + 500) },
        }]
      })
    } catch (e) { console.warn('[Notif native]', e) }
  } else {
    // Web fallback
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      try { new Notification(title, { body, icon: '/icon-192.png', tag: 'manasitra' }) }
      catch (e) { console.warn('[Notif web]', e) }
    }
  }
}

// ── Request permission ────────────────────────────────────────
export const requestNotificationPermission = async () => {
  try {
    if (isNative()) {
      const { LocalNotifications } = await import('@capacitor/local-notifications')
      const result = await LocalNotifications.requestPermissions()
      const granted = result.display === 'granted'
      localStorage.setItem(NOTIF_GRANTED_KEY, granted ? 'true' : 'false')
      return granted
    } else {
      // Web browser
      if (!('Notification' in window)) return false
      const result = await Notification.requestPermission()
      const granted = result === 'granted'
      localStorage.setItem(NOTIF_GRANTED_KEY, granted ? 'true' : 'false')
      return granted
    }
  } catch (e) {
    console.warn('[Notif permission]', e)
    return false
  }
}

// ── Check if already granted ──────────────────────────────────
export const checkNotificationPermission = async () => {
  try {
    if (isNative()) {
      const { LocalNotifications } = await import('@capacitor/local-notifications')
      const result = await LocalNotifications.checkPermissions()
      return result.display === 'granted'
    }
    return typeof Notification !== 'undefined' && Notification.permission === 'granted'
  } catch { return false }
}

// ── Start scheduler (every 15 min) ───────────────────────────
export const startNotificationScheduler = () => {
  // Clear existing
  const existing = localStorage.getItem(NOTIF_INTERVAL_KEY)
  if (existing) clearInterval(Number(existing))

  const tick = async () => {
    const { title, body } = getNotifContent()
    await sendNotif(title, body)
  }

  const id = setInterval(tick, 15 * 60 * 1000)
  localStorage.setItem(NOTIF_INTERVAL_KEY, String(id))

  // Send one immediately if exam within 3 days
  const urgent = getExams().filter(e => {
    const d = getDaysLeft(e.date)
    return d >= 0 && d <= 3
  })
  if (urgent.length > 0) {
    setTimeout(tick, 2000)
  }
}

export const stopNotificationScheduler = () => {
  const id = localStorage.getItem(NOTIF_INTERVAL_KEY)
  if (id) { clearInterval(Number(id)); localStorage.removeItem(NOTIF_INTERVAL_KEY) }
  localStorage.setItem(NOTIF_GRANTED_KEY, 'false')
}

export const sendTestNotification = async () => {
  const { title, body } = getNotifContent()
  await sendNotif(title, body)
}
