import { useNavigate } from 'react-router-dom'
import { useSessionStore } from '@store/session-store'
import { useSafetyStore } from '@store/safety-store'
import { useTranslation } from 'react-i18next'
import { DoorOpen } from 'lucide-react'
import { motion } from 'framer-motion'

export const QuickExit = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const clearSession = useSessionStore(s => s.clearSession)
  const reset = useSafetyStore(s => s.reset)

  const exit = () => {
    clearSession(); reset()
    window.history.replaceState(null, '', '/')
    navigate('/', { replace: true })
  }

  return (
    <motion.button whileTap={{ scale: 0.92 }} onClick={exit}
      aria-label={t('a11y.quick_exit')} title={t('chat.quick_exit_label')}
      style={{
        position:'fixed', top:14, right:14, zIndex:50,
        width:40, height:40, borderRadius:11,
        background:'var(--surface)', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)',
        border:'1px solid var(--border)', color:'var(--text-2)',
        display:'flex', alignItems:'center', justifyContent:'center',
        cursor:'pointer', transition:'all 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor='var(--danger)'; e.currentTarget.style.color='var(--danger)'; e.currentTarget.style.background='rgba(232,112,144,0.10)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-2)'; e.currentTarget.style.background='var(--surface)' }}
    >
      <DoorOpen size={17} />
    </motion.button>
  )
}
