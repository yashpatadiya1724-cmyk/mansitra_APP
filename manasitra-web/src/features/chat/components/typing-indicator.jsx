import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export const TypingIndicator = () => {
  const { t } = useTranslation()
  return (
    <div style={{ display: 'flex', gap: 10, marginBottom: 18 }} aria-label={t('a11y.typing_indicator')} aria-live="polite">
      <div style={{
        width: 34, height: 34, borderRadius: 10, flexShrink: 0, alignSelf: 'flex-end',
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
      }}>🌟</div>
      <div className="bubble-ai" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '14px 18px' }}>
        {[0,1,2].map(i => (
          <motion.div key={i}
            style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)' }}
            animate={{ y: [0,-5,0], opacity: [0.4,1,0.4] }}
            transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.14, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  )
}
