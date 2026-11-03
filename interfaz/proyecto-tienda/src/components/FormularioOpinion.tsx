import { useState } from 'react'

export type Opinion = {
  nombre: string
  texto: string
}

type FormularioOpinionProps = {
  onEnviar: (opinion: Opinion) => void
}

function FormularioOpinion({ onEnviar }: FormularioOpinionProps) {
  const [nombre, setNombre] = useState('')
  const [texto, setTexto] = useState('')
  const [error, setError] = useState('')

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        if (texto.trim() === '') {
          setError('Escribe tu opinión')
          return
        }
        setError('')
        onEnviar({ nombre: nombre.trim(), texto: texto.trim() })
        setNombre('')
        setTexto('')
      }}
    >
      <label htmlFor="nombre">Tu nombre</label>
      <input id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />

      <label htmlFor="texto">Tu opinión</label>
      <textarea id="texto" value={texto} onChange={e => setTexto(e.target.value)} />

      {error && <p role="alert">{error}</p>}
      <button type="submit">Enviar opinión</button>
    </form>
  )
}

export default FormularioOpinion
