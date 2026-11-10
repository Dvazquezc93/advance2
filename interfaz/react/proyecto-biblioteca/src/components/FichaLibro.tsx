type FichaLibroProps = {
  titulo: string
  generos: string[]
  prestado: boolean
}

function FichaLibro({ titulo, generos, prestado }: FichaLibroProps) {
  return (
    <section className="ficha">
      <h2>{titulo}</h2>
      {generos.length === 0 ? (
        <p>Sin géneros</p>
      ) : (
        <ul>
          {generos.map(g => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      )}
      <button disabled={prestado}>Reservar</button>
      {prestado && <p>Ahora mismo está prestado</p>}
    </section>
  )
}

export default FichaLibro
