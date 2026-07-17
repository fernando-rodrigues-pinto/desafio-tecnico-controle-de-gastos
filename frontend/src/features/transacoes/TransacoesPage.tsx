import { useState } from 'react'
import type { Pessoa, Transacao, TransacaoCreatePayload } from '../../types'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { Spinner } from '../../components/Feedback'
import TransacaoForm from './TransacaoForm'
import TransacaoList from './TransacaoList'

interface TransacoesPageProps {
  pessoas: Pessoa[]
  transacoes: Transacao[]
  isLoading: boolean
  onCreate: (payload: TransacaoCreatePayload) => Promise<void>
}

export default function TransacoesPage({
  pessoas,
  transacoes,
  isLoading,
  onCreate,
}: TransacoesPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function handleCreate(payload: TransacaoCreatePayload) {
    await onCreate(payload)
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-brand-light-text dark:text-brand-dark-text">
          Transações
        </h2>
        <Button onClick={() => setIsModalOpen(true)}>Nova transação</Button>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <TransacaoList transacoes={transacoes} pessoas={pessoas} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Cadastrar transação"
      >
        <TransacaoForm pessoas={pessoas} onSubmit={handleCreate} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  )
}