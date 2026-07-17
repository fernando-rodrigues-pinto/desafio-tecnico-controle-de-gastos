import { useState } from 'react'
import Tabs from './components/Tabs'
import ThemeToggle from './components/ThemeToggle'
import { ErrorMessage } from './components/Feedback'
import { useGastosData } from './hooks/useGastosData.ts'
import PessoasPage from './features/pessoas/PessoasPage'
import TransacoesPage from './features/transacoes/TransacoesPage'
import TotaisPage from './features/totais/TotaisPage'

const TABS = [
  { key: 'pessoas', label: 'Pessoas' },
  { key: 'transacoes', label: 'Transações' },
  { key: 'totais', label: 'Totais' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('pessoas')
  const { pessoas, transacoes, isLoading, error, criarPessoa, deletarPessoa, criarTransacao } =
    useGastosData()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700 bg-brand-light-surface dark:bg-brand-dark-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-base font-semibold text-brand-light-text dark:text-brand-dark-text">
            Fernando Rodrigues Pinto <span className="mx-2 text-slate-400">:</span> Controle de Gastos
          </span>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-brand-light-surface dark:bg-brand-dark-surface shadow-sm">
          <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

          <div className="p-6">
            {error && (
              <div className="mb-4">
                <ErrorMessage message={error} />
              </div>
            )}

            {activeTab === 'pessoas' && (
              <PessoasPage
                pessoas={pessoas}
                isLoading={isLoading}
                onCreate={criarPessoa}
                onDelete={deletarPessoa}
              />
            )}

            {activeTab === 'transacoes' && (
              <TransacoesPage
                pessoas={pessoas}
                transacoes={transacoes}
                isLoading={isLoading}
                onCreate={criarTransacao}
              />
            )}

            {activeTab === 'totais' && <TotaisPage pessoas={pessoas} transacoes={transacoes} />}
          </div>
        </div>
      </main>
    </div>
  )
}