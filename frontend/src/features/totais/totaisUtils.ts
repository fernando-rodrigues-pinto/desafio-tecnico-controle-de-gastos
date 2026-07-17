import type { Pessoa, Transacao, TotalGeral, TotalPorPessoa } from '../../types'

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Agrupa as transações por pessoa e reduz para receita/despesa/saldo,
// depois soma tudo para obter o total geral exibido ao final da listagem.
export function calcularTotais(
  pessoas: Pessoa[],
  transacoes: Transacao[]
): { porPessoa: TotalPorPessoa[]; geral: TotalGeral } {
  const porPessoa: TotalPorPessoa[] = pessoas.map((pessoa) => {
    const transacoesDaPessoa = transacoes.filter((t) => t.pessoaId === pessoa.id)
    const totalReceitas = transacoesDaPessoa
      .filter((t) => t.tipo.toString().toLowerCase() === 'receita')
      .reduce((soma, t) => soma + t.valor, 0)
    const totalDespesas = transacoesDaPessoa
      .filter((t) => t.tipo.toString().toLowerCase() === 'despesa')
      .reduce((soma, t) => soma + t.valor, 0)

    return {
      pessoa,
      totalReceitas,
      totalDespesas,
      saldo: totalReceitas - totalDespesas,
    }
  })

  const geral = porPessoa.reduce<TotalGeral>(
    (acc, item) => ({
      totalReceitas: acc.totalReceitas + item.totalReceitas,
      totalDespesas: acc.totalDespesas + item.totalDespesas,
      saldo: acc.saldo + item.saldo,
    }),
    { totalReceitas: 0, totalDespesas: 0, saldo: 0 }
  )

  return { porPessoa, geral }
}