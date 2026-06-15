import { clsx } from 'clsx'

export const Input = ({ label, error, className, id, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label htmlFor={id} className="text-sm text-[var(--color-text-muted)]">{label}</label>
    )}
    <input
      id={id}
      autoComplete="off"
      className={clsx(
        'w-full px-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]',
        'text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]',
        'focus:outline-none focus:border-[var(--color-primary)] transition-colors',
        'min-h-[44px]',
        error && 'border-[var(--color-danger)]',
        className
      )}
      {...props}
    />
    {error && <span className="text-xs text-[var(--color-danger)]">{error}</span>}
  </div>
)
