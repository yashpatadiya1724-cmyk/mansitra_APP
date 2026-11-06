import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

const icons = { success: CheckCircle, error: AlertCircle, info: Info }
const colors = {
  success: 'border-[var(--color-success)] text-[var(--color-success)]',
  error: 'border-[var(--color-danger)] text-[var(--color-danger)]',
  info: 'border-[var(--color-primary)] text-[var(--color-primary)]',
}

export const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const Icon = icons[type]
  useEffect(() => {
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [duration, onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`glass-sm flex items-center gap-3 px-4 py-3 border ${colors[type]} max-w-sm`}
      role="alert"
    >
      <Icon size={18} />
      <span className="text-sm text-[var(--color-text)] flex-1">{message}</span>
      <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
        <X size={14} />
      </button>
    </motion.div>
  )
}

// Toast container
let toastFn = null
export const useToast = () => {
  const [toasts, setToasts] = useState([])
  const show = (message, type = 'info') => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, type }])
  }
  const remove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))
  return { toasts, show, remove }
}

export const ToastContainer = ({ toasts, remove }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center">
    <AnimatePresence>
      {toasts.map((t) => (
        <Toast key={t.id} message={t.message} type={t.type} onClose={() => remove(t.id)} />
      ))}
    </AnimatePresence>
  </div>
)
