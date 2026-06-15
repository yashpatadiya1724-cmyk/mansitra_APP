import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useMoodStore } from '@store/mood-store'
import { MOOD_STATES } from '@/app/config/constants'
import { useProgressStore } from '@store/progress-store'
import { X } from 'lucide-react'

const MOOD_COLOR = {
  very_happy:'#F5C842', content:'#5DD6A0', neutral:'#9E9B94',
  anxious:'#F0B860', sad:'#5B9BD5', overwhelmed:'#E87090', exhausted:'#9B8FF0',
}

const GREETINGS = {
  en: ['Good to see you.', 'Welcome back.', 'Hey, you showed up.', 'You came back. That matters.'],
  hi: ['अच्छा लगा तुम्हें देखकर।', 'वापस आए, अच्छा किया।', 'हे, तुम आए।', 'तुम वापस आए। यह मायने रखता है।'],
  gu: ['તને જોઈને સારું લાગ્યું.', 'પાછા આવ્યા, સારું કર્યું.', 'હે, તું આવ્યો.', 'તું પાછો આવ્યો. આ મહત્વ ધરાવે છે.'],
}

const PROMPT = {
  en: 'How are you feeling right now?',
  hi: 'अभी तुम कैसा महसूस कर रहे हो?',
  gu: 'અત્યારે તું કેવું અનુભવ કરે છે?',
}

export const DailyCheckInPrompt = ({ onMoodSelect, onDismiss }) => {
  const { t, i18n } = useTranslation()
  const { getTodaysMood } = useMoodStore()
  const [visible, setVisible] = useState(false)
  const lang = i18n.language

  useEffect(() => {
    // Show if: no mood logged today AND last shown > 6 hours ago
    const todaysMood = getTodaysMood()
    const lastShown = parseInt(localStorage.getItem('manasitra_checkin_shown') || '0')
    const sixHours = 6 * 60 * 60 * 1000
    if (!todaysMood && Date.now() - lastShown > sixHours) {
      const timer = setTimeout(() => {
        setVisible(true)
        localStorage.setItem('manasitra_checkin_shown', Date.now().toString())
      }, 1500) // slight delay so it doesn't feel jarring
      return () => clearTimeout(timer)
    }
  }, [])

  const greetings = GREETINGS[lang] || GREETINGS.en
  const greeting = greetings[new Date().getHours() % greetings.length]
  const prompt = PROMPT[lang] || PROMPT.en

  const handleSelect = (moodId) => {
    setVisible(false)
    onMoodSelect?.(moodId)
  }

  const handleDismiss = () => {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            position: 'fixed', bottom: 90, left: '50%', transform: 'translateX(-50%)',
            width: 'calc(100% - 32px)', maxWidth: 480, zIndex: 30,
            background: 'var(--surface)', backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-2)', borderRadius: 20,
            padding: '18px 20px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px var(--border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 3 }}>{greeting}</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
                {prompt}
              </p>
            </div>
            <button onClick={handleDismiss}
              style={{ width: 28, height: 28, borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              aria-label="Dismiss"
            ><X size={14} /></button>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {MOOD_STATES.map(mood => (
              <motion.button key={mood.id} whileTap={{ scale: 0.92 }}
                onClick={() => handleSelect(mood.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 12px', borderRadius: 999, cursor: 'pointer',
                  border: `1px solid ${MOOD_COLOR[mood.id]}30`,
                  background: `${MOOD_COLOR[mood.id]}10`,
                  color: MOOD_COLOR[mood.id],
                  fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = `${MOOD_COLOR[mood.id]}20`}
                onMouseLeave={e => e.currentTarget.style.background = `${MOOD_COLOR[mood.id]}10`}
              >
                <span>{mood.emoji}</span>
                <span>{t(`mood.states.${mood.id}`)}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
