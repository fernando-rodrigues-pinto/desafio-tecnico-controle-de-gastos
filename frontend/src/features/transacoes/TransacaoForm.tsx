import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'
import type { Pessoa, TipoTransacao, TransacaoCreatePayload } from '../../types'

interface TransacaoFormProps {
  pessoas: Pessoa[]
  onSubmit: (payload: TransacaoCreatePayload) => Promise<void>
  onCancel: () => void
}

export default function TransacaoForm({ pessoas, onSubmit, onCancel }: TransacaoFormProps) {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState<TipoTransacao>('despesa')

  // Força o ID inicial a começar como String para alinhar com o HTML
  const [pessoaId, setPessoaId] = useState(pessoas[0]?.id ? String(pessoas[0].id) : '')
  const [errors, setErrors] = useState<{ descricao?: string; valor?: string; pessoaId?: string; tipo?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Correção: Transforma p.id em String para garantir que "1" === "1" funcione
  const pessoaSelecionada = useMemo(
    () => pessoas.find((p) => String(p.id) === String(pessoaId)),
    [pessoas, pessoaId]
  )
  const menorDeIdade = pessoaSelecionada ? pessoaSelecionada.idade < 18 : false

  function handlePessoaChange(id: string) {
    setPessoaId(id)
    const p = pessoas.find((item) => String(item.id) === String(id))
    if (p && p.idade < 18) {
      setTipo('despesa')
    }
  }

  function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digitsOnly = e.target.value.replace(/\D/g, '')
    if (!digitsOnly) {
      setValor('')
      return
    }
    const centavos = Number(digitsOnly) / 100
    setValor(centavos.toFixed(2))
  }

  function validar(): boolean {
    const nextErrors: typeof errors = {}
    if (!descricao.trim()) nextErrors.descricao = 'Informe a descrição.'

    const valorNumero = Number(valor)
    if (valor === '' || Number.isNaN(valorNumero) || valorNumero <= 0) {
      nextErrors.valor = 'Informe um valor maior que zero.'
    }

    if (!pessoaId) nextErrors.pessoaId = 'Selecione uma pessoa.'

    if (menorDeIdade && tipo === 'receita') {
      nextErrors.tipo = 'Menores de idade não podem registrar receitas.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validar()) return
    setIsSubmitting(true)

    try {
      const tipoBackend = tipo === 'receita' ? 'Receita' : 'Despesa'

      // Se o ID for puramente numérico, converte de volta para número antes de mandar ao C#
      const idEnviar = !isNaN(Number(pessoaId)) ? Number(pessoaId) : pessoaId

      await onSubmit({
        descricao: descricao.trim(),
        valor: Number(valor),
        tipo: tipoBackend as unknown as TipoTransacao,
        pessoaId: idEnviar as unknown as string,
      })
    } catch (error) {
      console.error('Erro ao salvar transação:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (pessoas.length === 0) {
    return <p className="text-sm text-slate-500">Cadastre uma pessoa primeiro.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Select
        label="Pessoa"
        value={pessoaId}
        onChange={(e) => handlePessoaChange(e.target.value)}
        error={errors.pessoaId}
        options={pessoas.map((p) => ({ value: String(p.id), label: `${p.nome} (${p.idade} anos)` }))}
      />

      <Input
        label="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        error={errors.descricao}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Valor
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 dark:text-slate-500 font-medium select-none">
            R$
          </span>
          <input
            type="text"
            inputMode="numeric"
            className={`w-full rounded-md border py-2 pl-9 pr-3 text-sm bg-brand-light-surface dark:bg-brand-dark-bg text-brand-light-text dark:text-brand-dark-text placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light-cyan dark:focus-visible:ring-brand-dark-cyan ${
              errors.valor ? 'border-status-despesa' : 'border-slate-300 dark:border-slate-600'
            }`}
            placeholder="0,00"
            value={valor}
            onChange={handleValorChange}
          />
        </div>
        <span className={`text-xs text-status-despesa h-4 block ${errors.valor ? 'visible' : 'invisible'}`}>
          {errors.valor || ' '}
        </span>
      </div>

      <Select
        label="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value as TipoTransacao)}
        error={errors.tipo}
        options={[
          { value: 'despesa', label: 'Despesa' },
          ...(menorDeIdade ? [] : [{ value: 'receita', label: 'Receita' }]),
        ]}
      />

      {menorDeIdade && (
        <div className="rounded border border-brand-light-gold/20 bg-brand-light-gold/10 p-2">
          <p className="text-xs text-brand-light-gold dark:text-brand-dark-gold font-medium">
            Restrição: Estatuto menor de idade ativo. Apenas despesas são permitidas.
          </p>
        </div>
      )}

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