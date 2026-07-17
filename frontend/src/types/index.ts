// Tipos espelhando os DTOs esperados da API .NET.
// Convenção assumida: JSON em camelCase (padrão do System.Text.Json no ASP.NET Core).

export interface Pessoa {
  id: string
  nome: string
  idade: number
}

// Payload de criação não inclui o id (gerado pelo backend).
export type PessoaCreatePayload = Omit<Pessoa, 'id'>

export type TipoTransacao = 'receita' | 'despesa'

export interface Transacao {
  id: string
  descricao: string
  valor: number
  tipo: TipoTransacao
  pessoaId: string
}

export type TransacaoCreatePayload = Omit<Transacao, 'id'>

// Estrutura usada para a aba "Totais", calculada a partir de pessoas + transações.
export interface TotalPorPessoa {
  pessoa: Pessoa
  totalReceitas: number
  totalDespesas: number
  saldo: number
}

export interface TotalGeral {
  totalReceitas: number
  totalDespesas: number
  saldo: number
}