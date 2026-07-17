import type { Pessoa, Transacao } from '../../types'
import { Badge, EmptyState } from '../../components/Feedback'
import { formatarMoeda } from '../totais/totaisUtils'

interface TransacaoListProps {
  transacoes: Transacao[]
  pessoas: Pessoa[]
}

export default function TransacaoList({ transacoes, pessoas }: TransacaoListProps) {
  if (!Array.isArray(transacoes) || transacoes.length === 0) {
    return <EmptyState>Nenhuma transação cadastrada  ainda.</EmptyState>
  }

  // Mapa auxiliar para exibir o nome da pessoa sem varrer o array a cada linha.
  const nomesPorId = new Map(pessoas.map((p) => [p.id, p.nome]))

  return (
    <div className="overflow-x-auto rounded-md border border-slate-200 dark:border-slate-700">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800 text-left text-slate-500 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Descrição</th>
            <th className="px-4 py-3 font-medium">Pessoa</th>
            <th className="px-4 py-3 font-medium">Tipo</th>
            <th className="px-4 py-3 font-medium text-right">Valor</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {transacoes.map((t) => (
            <tr key={t.id}>
              <td className="px-4 py-3 text-brand-light-text dark:text-brand-dark-text">
                {t.descricao}
              </td>
              <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                {nomesPorId.get(t.pessoaId) ?? 'Pessoa removida'}
              </td>
              <td className="px-4 py-3">
                <Badge tipo={t.tipo.toString().toLowerCase() as 'receita' | 'despesa'} />
              </td>
              <td className="px-4 py-3 text-right font-medium text-brand-light-text dark:text-brand-dark-text">
                {formatarMoeda(t.valor)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}