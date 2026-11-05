import { useEffect, useState } from 'react'

type Prestamo = {
  id: number
  libro: string
  devolucion: string
}

function ListaPrestamos() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignorar = false

    async function cargar() {
      try {
        const respuesta = await fetch('https://biblioteca.ejemplo.es/api/prestamos')
        if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`)
        const datos: Prestamo[] = await respuesta.json()
        if (!ignorar) setPrestamos(datos)
      } catch (e) {
        if (!ignorar) setError(e instanceof Error ? e.message : 'Error desconocido')
      } finally {
        if (!ignorar) setCargando(false)
      }
    }

    cargar()
    return () => { ignorar = true }
  }, [])

  if (cargando) return <p>Cargando préstamos…</p>
  if (error) return <p className="error">No se han podido cargar los préstamos: {error}</p>
  if (prestamos.length === 0) return <p>No tienes préstamos</p>

  return (
    <ul>
      {prestamos.map(p => (
        <li key={p.id}>
          {p.libro} — devolver el {p.devolucion}
        </li>
      ))}
    </ul>
  )
}

export default ListaPrestamos
