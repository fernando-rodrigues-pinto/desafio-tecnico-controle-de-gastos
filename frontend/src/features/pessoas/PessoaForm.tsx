import { useState } from 'react'
import type { FormEvent } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import type { PessoaCreatePayload } from '../../types'

interface PessoaFormProps {
  onSubmit: (payload: PessoaCreatePayload) => Promise<void>
  onCancel: () => void
}

export default function PessoaForm({ onSubmit, onCancel }: PessoaFormProps) {
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [errors, setErrors] = useState<{ nome?: string; idade?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validar(): boolean {
    const nextErrors: typeof errors = {}
    if (!nome.trim()) nextErrors.nome = 'Informe o nome.'
    const idadeNumero = Number(idade)
    if (idade === '' || Number.isNaN(idadeNumero) || idadeNumero < 0) {
      nextErrors.idade = 'Informe uma idade válida.'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validar()) return
    setIsSubmitting(true)
    try {
      await onSubmit({ nome: nome.trim(), idade: Number(idade) })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        error={errors.nome}
      />
      <Input
        label="Idade"
        type="number"
        min={0}
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        error={errors.idade}
      />
      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  )
}