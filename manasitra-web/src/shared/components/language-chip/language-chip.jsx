import { motion } from 'framer-motion'
import { clsx } from 'clsx'

export const LanguageChip = ({ language, selected, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    onClick={() => onClick?.(language.code)}
    aria-pressed={selected}
    className={clsx(
      'flex flex-col items-center gap-1 px-5 py-3 rounded-xl border transition-all cursor-pointer min-h-[44px]',
      selected
        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-primary)]'
        : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-primary)]/50'
    )}
  >
    <span className="font-semibold text-base">{language.nativeName}</span>
    <span className="text-xs opacity-60">{language.name}</span>
  </motion.button>
)
