import { useCallback, useEffect, useState } from 'react'
import { pessoasApi, transacoesApi } from '../api/api'
import type { Pessoa, PessoaCreatePayload, Transacao, TransacaoCreatePayload } from '../types'

// Centraliza o carregamento e as mutações de pessoas/transações,
// evitando fetches duplicados entre as abas (Pessoas, Transações e Totais
// dependem dos mesmos dados).
export function useGastosData() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([])
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const carregarTudo = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [pessoasData, transacoesData] = await Promise.all([
        pessoasApi.listar(),
        transacoesApi.listar(),
      ])
      setPessoas(pessoasData)
      setTransacoes(transacoesData)
    } catch {
      setError('Não foi possível carregar os dados. Verifique se a API está em execução.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    carregarTudo()
  }, [carregarTudo])

  const criarPessoa = useCallback(async (payload: PessoaCreatePayload) => {
    const nova = await pessoasApi.criar(payload)
    setPessoas((prev) => [...prev, nova])
  }, [])

  const deletarPessoa = useCallback(async (id: string) => {
    await pessoasApi.deletar(id)
    // Reflete no cliente a exclusão em cascata das transações feita pelo backend.
    setPessoas((prev) => prev.filter((p) => p.id !== id))
    setTransacoes((prev) => prev.filter((t) => t.pessoaId !== id))
  }, [])

  const criarTransacao = useCallback(async (payload: TransacaoCreatePayload) => {
    const nova = await transacoesApi.criar(payload)
    setTransacoes((prev) => [...prev, nova])
  }, [])

  return {
    pessoas,
    transacoes,
    isLoading,
    error,
    criarPessoa,
    deletarPessoa,
    criarTransacao,
    recarregar: carregarTudo,
  }
}