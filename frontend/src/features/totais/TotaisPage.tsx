import { useMemo } from 'react'
import type { Pessoa, Transacao } from '../../types'
import { EmptyState } from '../../components/Feedback'
import { calcularTotais, formatarMoeda } from './totaisUtils'

interface TotaisPageProps {
  pessoas: Pessoa[]
  transacoes: Transacao[]
}

export default function TotaisPage({ pessoas, transacoes }: TotaisPageProps) {
  const { porPessoa, geral } = useMemo(() => {
    // Guarda de segurança: se a API não retornar arrays válidos, devolvemos os valores zerados
    if (!Array.isArray(pessoas) || !Array.isArray(transacoes)) {
      return {
        porPessoa: [],
        geral: { totalReceitas: 0, totalDespesas: 0, saldo: 0 }
      }
    }
    return calcularTotais(pessoas, transacoes)
  }, [pessoas, transacoes])

  if (!Array.isArray(pessoas) || pessoas.length === 0) {
    return <EmptyState>Cadastre pessoas e transações para ver os totais aqui.</EmptyState>
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Alinhamento invisível para parear com o botão das outras abas */}
      <div className="flex items-center min-h-[37px]">
        <h2 className="text-lg font-semibold text-brand-light-text dark:text-brand-dark-text">
          Totais
        </h2>
      </div>

      <div className="overflow-x-auto rounded-md border mt-[1px] border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800 text-left text-slate-500 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3 font-medium">Pessoa</th>
              <th className="px-4 py-3 font-medium text-right">Receitas</th>
              <th className="px-4 py-3 font-medium text-right">Despesas</th>
              <th className="px-4 py-3 font-medium text-right">Saldo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {porPessoa.map(({ pessoa, totalReceitas, totalDespesas, saldo }) => (
              <tr key={pessoa.id}>
                <td className="px-4 py-3 text-brand-light-text dark:text-brand-dark-text">
                  {pessoa.nome}
                </td>
                <td className="px-4 py-3 text-right text-status-receita">
                  {formatarMoeda(totalReceitas)}
                </td>
                <td className="px-4 py-3 text-right text-status-despesa">
                  {formatarMoeda(totalDespesas)}
                </td>
                <td
                  className={`px-4 py-3 text-right font-semibold ${
                    saldo >= 0 ? 'text-status-receita' : 'text-status-despesa'
                  }`}
                >
                  {formatarMoeda(saldo)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 font-semibold">
              <td className="px-4 py-3 text-brand-light-text dark:text-brand-dark-text">
                Total geral
              </td>
              <td className="px-4 py-3 text-right text-status-receita">
                {formatarMoeda(geral.totalReceitas)}
              </td>
              <td className="px-4 py-3 text-right text-status-despesa">
                {formatarMoeda(geral.totalDespesas)}
              </td>
              <td
                className={`px-4 py-3 text-right ${
                  geral.saldo >= 0 ? 'text-status-receita' : 'text-status-despesa'
                }`}
              >
                {formatarMoeda(geral.saldo)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}