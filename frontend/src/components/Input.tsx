import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export default function Input({ label, error, id, className = '', ...rest }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-medium text-slate-600 dark:text-slate-300">
        {label}
      </label>
      <input
        id={inputId}
        className={`rounded-md border px-3 py-2 text-sm bg-brand-light-surface dark:bg-brand-dark-bg text-brand-light-text dark:text-brand-dark-text placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light-cyan dark:focus-visible:ring-brand-dark-cyan ${
          error
            ? 'border-status-despesa'
            : 'border-slate-300 dark:border-slate-600'
        } ${className}`}
        {...rest}
      />
      <span className={`text-xs text-status-despesa h-4 block ${error ? 'visible' : 'invisible'}`}>
        {error || ' '}
      </span>
    </div>
  )
}