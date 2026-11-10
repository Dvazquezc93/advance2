import { useEffect, useState } from 'react'

function ListaCategorias() {
  const [categorias, setCategorias] = useState<string[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignorar = false

    async function cargar() {
      try {
        const respuesta = await fetch('https://fakestoreapi.com/products/categories')
        if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`)
        const datos: string[] = await respuesta.json()
        if (!ignorar) setCategorias(datos)
      } catch (e) {
        if (!ignorar) setError(e instanceof Error ? e.message : 'Error desconocido')
      } finally {
        if (!ignorar) setCargando(false)
      }
    }

    cargar()
    return () => { ignorar = true }
  }, [])

  if (cargando) return <p>Cargando categorías…</p>
  if (error) return <p className="error">No se han podido cargar las categorías: {error}</p>

  return (
    <ul>
      {categorias.map(c => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  )
}

export default ListaCategorias
