import { useState } from 'react'
import type { Pessoa, PessoaCreatePayload } from '../../types'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { Spinner } from '../../components/Feedback'
import PessoaForm from './PessoaForm'
import PessoaList from './PessoaList'

interface PessoasPageProps {
  pessoas: Pessoa[]
  isLoading: boolean
  onCreate: (payload: PessoaCreatePayload) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function PessoasPage({ pessoas, isLoading, onCreate, onDelete }: PessoasPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pessoaToDelete, setPessoaToDelete] = useState<Pessoa | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleCreate(payload: PessoaCreatePayload) {
    await onCreate(payload)
    setIsModalOpen(false)
  }

  async function confirmDelete() {
    if (!pessoaToDelete) return
    setIsDeleting(true)
    try {
      await onDelete(pessoaToDelete.id)
    } finally {
      setIsDeleting(false)
      setPessoaToDelete(null)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between min-h-[36px]">
        <h2 className="text-lg font-semibold text-brand-light-text dark:text-brand-dark-text">
          Pessoas
        </h2>
        <Button onClick={() => setIsModalOpen(true)}>Nova pessoa</Button>
      </div>

      {isLoading ? <Spinner /> : <PessoaList pessoas={pessoas} onDelete={(p) => setPessoaToDelete(p)} />}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Cadastrar pessoa">
        <PessoaForm onSubmit={handleCreate} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal isOpen={!!pessoaToDelete} onClose={() => setPessoaToDelete(null)} title="Confirmar Exclusão">
        <div className="flex flex-col gap-4">
          <p className="text-brand-light-text dark:text-brand-dark-text">
            Tem certeza que deseja excluir <strong>{pessoaToDelete?.nome}</strong>? <br />
            <span className="text-status-despesa text-sm">Todas as transações vinculadas também serão apagadas permanentemente.</span>
          </p>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="secondary" onClick={() => setPessoaToDelete(null)} disabled={isDeleting}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? 'Excluindo...' : 'Excluir'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}