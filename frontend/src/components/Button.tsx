import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-light-cyan dark:bg-brand-dark-cyan text-white dark:text-brand-dark-bg hover:opacity-90 border border-transparent',
  secondary:
    'bg-transparent text-brand-light-text dark:text-brand-dark-text border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700',
  danger:
    'bg-transparent text-status-despesa border border-status-despesa hover:bg-status-despesa hover:text-white',
  ghost:
    'bg-transparent text-brand-light-text dark:text-brand-dark-text border border-transparent hover:bg-slate-100 dark:hover:bg-slate-800',
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light-cyan dark:focus-visible:ring-brand-dark-cyan ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}