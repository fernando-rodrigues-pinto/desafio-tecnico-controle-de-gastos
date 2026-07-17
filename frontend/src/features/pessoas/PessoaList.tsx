import type { Pessoa } from '../../types'
import Button from '../../components/Button'
import { EmptyState } from '../../components/Feedback'

interface PessoaListProps {
  pessoas: Pessoa[]
  onDelete: (pessoa: Pessoa) => void
}

export default function PessoaList({ pessoas, onDelete }: PessoaListProps) {
  if (!Array.isArray(pessoas) || pessoas.length === 0) {
    return <EmptyState>Nenhuma pessoa cadastrada ainda.</EmptyState>
  }

  return (
    <div className="overflow-x-auto rounded-md border border-slate-200 dark:border-slate-700">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800 text-left text-slate-500 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Nome</th>
            <th className="px-4 py-3 font-medium">Idade</th>
            <th className="px-4 py-3 font-medium text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id}>
              <td className="px-4 py-3 text-brand-light-text dark:text-brand-dark-text">
                {pessoa.nome}
              </td>
              <td className="px-4 py-3 text-brand-light-text dark:text-brand-dark-text">
                {pessoa.idade} anos
                {pessoa.idade < 18 && (
                  <span className="ml-2 rounded bg-brand-light-gold/10 px-1.5 py-0.5 text-xs text-brand-light-gold dark:text-brand-dark-gold font-medium">
                    Menor de idade
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                {/* Botão de exclusão compacto com ícone de lixeira */}
                <Button
                  variant="danger"
                  className="!p-1.5"
                  onClick={() => onDelete(pessoa)}
                  title={`Excluir ${pessoa.nome}`}
                  aria-label="Excluir"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}