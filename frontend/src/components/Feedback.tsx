import type { ReactNode } from 'react'

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-md border border-dashed border-slate-300 dark:border-slate-600 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
      {children}
    </div>
  )
}

export function Badge({ tipo }: { tipo: 'receita' | 'despesa' }) {
  const isReceita = tipo === 'receita'
  return (
    <span
      className={`rounded px-2 py-0.5 text-xs font-semibold ${
        isReceita
          ? 'bg-status-receita/10 text-status-receita'
          : 'bg-status-despesa/10 text-status-despesa'
      }`}
    >
      {isReceita ? 'Receita' : 'Despesa'}
    </span>
  )
}

export function Spinner() {
  return (
    <div className="flex justify-center py-10">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-brand-light-cyan dark:border-t-brand-dark-cyan" />
    </div>
  )
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="rounded-md border border-status-despesa/40 bg-status-despesa/5 px-4 py-3 text-sm text-status-despesa">
      {message}
    </div>
  )
}