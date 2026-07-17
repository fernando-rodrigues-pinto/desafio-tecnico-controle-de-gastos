import { useEffect, useState } from 'react'

// Lê a preferência salva ou o esquema do sistema operacional na primeira renderização.
function getInitialTheme(): boolean {
  const stored = localStorage.getItem('theme')
  if (stored) return stored === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      aria-label="Alternar tema"
      className="rounded-md border border-slate-300 dark:border-slate-600 px-3 py-1.5 text-sm font-medium text-brand-light-text dark:text-brand-dark-text hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
    >
      {isDark ? 'Modo claro' : 'Modo escuro'}
    </button>
  )
}