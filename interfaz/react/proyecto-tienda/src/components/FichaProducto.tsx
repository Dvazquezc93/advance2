type FichaProductoProps = {
  nombre: string
  caracteristicas: string[]
}

function FichaProducto({ nombre, caracteristicas }: FichaProductoProps) {
  return (
    <section className="ficha">
      <h2>{nombre}</h2>
      {caracteristicas.length === 0 ? (
        <p>Sin características</p>
      ) : (
        <ul>
          {caracteristicas.map(c => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      )}
      <button>Añadir al carrito</button>
    </section>
  )
}

export default FichaProducto
