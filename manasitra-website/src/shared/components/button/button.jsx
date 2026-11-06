import { motion } from 'framer-motion'
import { clsx } from 'clsx'

const variants = {
  primary: 'bg-[var(--color-primary)] text-white hover:opacity-90',
  secondary: 'bg-[var(--color-secondary)] text-white hover:opacity-90',
  ghost: 'bg-transparent border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface)]',
  danger: 'bg-[var(--color-danger)] text-white hover:opacity-90',
  crisis: 'bg-[var(--color-danger)] text-white font-semibold shadow-lg shadow-red-500/20',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-5 py-2.5 text-sm min-h-[44px]',
  lg: 'px-6 py-3 text-base min-h-[52px]',
}

export const Button = ({
  children, variant = 'primary', size = 'md',
  disabled, loading, onClick, className, type = 'button', ...props
}) => (
  <motion.button
    type={type}
    whileTap={{ scale: disabled ? 1 : 0.97 }}
    onClick={onClick}
    disabled={disabled || loading}
    className={clsx(
      'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
      variants[variant], sizes[size], className
    )}
    {...props}
  >
    {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : children}
  </motion.button>
)
