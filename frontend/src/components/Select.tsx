import type { SelectHTMLAttributes } from 'react'

interface Option {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Option[]
  error?: string
}

export default function Select({ label, options, error, id, className = '', ...rest }: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={selectId} className="text-sm font-medium text-slate-600 dark:text-slate-300">
        {label}
      </label>
      <select
        id={selectId}
        className={`rounded-md border px-3 py-2 text-sm bg-brand-light-surface dark:bg-brand-dark-bg text-brand-light-text dark:text-brand-dark-text focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light-cyan dark:focus-visible:ring-brand-dark-cyan ${
          error ? 'border-status-despesa' : 'border-slate-300 dark:border-slate-600'
        } ${className}`}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-status-despesa">{error}</span>}
    </div>
  )
}