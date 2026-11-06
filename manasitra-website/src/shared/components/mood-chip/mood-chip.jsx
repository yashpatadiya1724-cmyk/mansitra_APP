import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MOOD_STATES } from '@store/../config/constants'
import { clsx } from 'clsx'
import { Sun, Smile, Meh, Zap, CloudRain, Wind, Moon } from 'lucide-react'

const MOOD_ICONS = { very_happy: Sun, content: Smile, neutral: Meh, anxious: Zap, sad: CloudRain, overwhelmed: Wind, exhausted: Moon }

export const MoodChip = ({ moodId, selected, onClick }) => {
  const { t } = useTranslation()
  const mood = MOOD_STATES.find((m) => m.id === moodId)
  if (!mood) return null
  const Icon = MOOD_ICONS[moodId] || Smile

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick?.(moodId)}
      aria-label={t(`mood.states.${moodId}`)}
      aria-pressed={selected}
      className={clsx(
        'flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all min-w-[72px] min-h-[72px] cursor-pointer',
        selected
          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 scale-105'
          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/50'
      )}
    >
      <Icon size={22} style={{ color: selected ? mood.color : 'var(--text-3)' }} aria-hidden="true" />
      <span className="text-xs text-[var(--color-text-muted)] text-center leading-tight">
        {t(`mood.states.${moodId}`)}
      </span>
    </motion.button>
  )
}
