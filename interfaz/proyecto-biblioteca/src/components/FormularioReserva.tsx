import { useState } from 'react'

export type Reserva = {
  socio: string
  correo: string
}

type FormularioReservaProps = {
  onReservar: (reserva: Reserva) => void
}

function FormularioReserva({ onReservar }: FormularioReservaProps) {
  const [socio, setSocio] = useState('')
  const [correo, setCorreo] = useState('')
  const [error, setError] = useState('')

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        if (socio.trim() === '') {
          setError('Escribe tu nombre')
          return
        }
        if (!correo.includes('@')) {
          setError('El correo no es válido')
          return
        }
        setError('')
        onReservar({ socio: socio.trim(), correo: correo.trim() })
        setSocio('')
        setCorreo('')
      }}
    >
      <label htmlFor="socio">Nombre del socio</label>
      <input id="socio" value={socio} onChange={e => setSocio(e.target.value)} />

      <label htmlFor="correo">Correo</label>
      <input id="correo" value={correo} onChange={e => setCorreo(e.target.value)} />

      {error && <p role="alert">{error}</p>}
      <button type="submit">Reservar libro</button>
    </form>
  )
}

export default FormularioReserva
