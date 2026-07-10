import { clsx } from 'clsx'

const variants = {
  default: 'glass p-5',
  glass: 'glass p-5',
  mood: 'glass-sm p-4 cursor-pointer transition-transform hover:scale-105',
  helpline: 'glass p-5 border-l-4 border-l-[var(--color-secondary)]',
  game: 'glass p-5 cursor-pointer hover:border-[var(--color-primary)] transition-colors',
  affirmation: 'glass p-6 text-center',
}

export const Card = ({ children, variant = 'default', className, onClick, ...props }) => (
  <div
    className={clsx(variants[variant], className)}
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    {...props}
  >
    {children}
  </div>
)
