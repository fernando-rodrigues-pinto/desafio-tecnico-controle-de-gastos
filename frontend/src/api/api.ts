import axios from 'axios'
import type {
  Pessoa,
  PessoaCreatePayload,
  Transacao,
  TransacaoCreatePayload,
} from '../types'

// Base configurável via variável de ambiente (.env -> VITE_API_URL).
// Em dev, o vite.config.ts também faz proxy de "/api" para o backend .NET.
const baseURL = import.meta.env.VITE_API_URL ?? '/api'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Endpoints assumidos seguindo convenção REST padrão:
// GET/POST   /pessoas        DELETE /pessoas/{id}
// GET/POST   /transacoes
export const pessoasApi = {
  listar: () => api.get<Pessoa[]>('/pessoas').then((res) => res.data),
  criar: (payload: PessoaCreatePayload) =>
    api.post<Pessoa>('/pessoas', payload).then((res) => res.data),
  deletar: (id: string) => api.delete(`/pessoas/${id}`),
}

export const transacoesApi = {
  listar: () => api.get<Transacao[]>('/transacoes').then((res) => res.data),
  criar: (payload: TransacaoCreatePayload) =>
    api.post<Transacao>('/transacoes', payload).then((res) => res.data),
}