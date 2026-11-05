type LibroProps = {
  titulo: string
  autor: string
  ejemplares: number
}

function Libro({ titulo, autor, ejemplares }: LibroProps) {
  let estado = `Disponible (${ejemplares})`
  if (ejemplares === 0) estado = 'No disponible'
  else if (ejemplares === 1) estado = 'Último ejemplar'

  return (
    <div className="libro">
      <h3>{titulo}</h3>
      <p>de {autor}</p>
      <p>{estado}</p>
    </div>
  )
}

export default Libro
