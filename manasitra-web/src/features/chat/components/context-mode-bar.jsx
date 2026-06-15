import { motion } from 'framer-motion'
import { useSessionStore } from '@store/session-store'
import { RESPONSE_MODES } from '@/app/config/constants'
import { BookOpen, Briefcase, Moon, Users, Heart, Zap } from 'lucide-react'

const MODES = [
  { id: RESPONSE_MODES.STANDARD,    label: 'General',    icon: Heart,    color: 'var(--primary)' },
  { id: RESPONSE_MODES.STUDY,       label: 'Exam',       icon: BookOpen, color: '#F0B860' },
  { id: 'placement',                label: 'Placement',  icon: Briefcase,color: '#62C8B9' },
  { id: 'sleep',                    label: 'Sleep',      icon: Moon,     color: '#9B8FF0' },
  { id: 'family',                   label: 'Family',     icon: Users,    color: '#E87090' },
  { id: RESPONSE_MODES.PANIC,       label: 'Panic',      icon: Zap,      color: '#5DD6A0' },
]

export const ContextModeBar = () => {
  const { responseMode, setResponseMode } = useSessionStore()

  return (
    <div style={{
      display: 'flex', gap: 6, overflowX: 'auto', padding: '8px 20px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }}>
      {MODES.map(({ id, label, icon: Icon, color }) => {
        const active = responseMode === id
        return (
          <motion.button key={id} whileTap={{ scale: 0.95 }}
            onClick={() => setResponseMode(active ? RESPONSE_MODES.STANDARD : id)}
            title={`${label} mode`}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 12px', borderRadius: 999, cursor: 'pointer', flexShrink: 0,
              border: `1px solid ${active ? color : 'var(--border)'}`,
              background: active ? `${color}18` : 'transparent',
              color: active ? color : 'var(--text-3)',
              fontSize: 12, fontWeight: active ? 600 : 400,
              transition: 'all 0.15s',
            }}
          >
            <Icon size={12} />
            {label}
          </motion.button>
        )
      })}
    </div>
  )
}
