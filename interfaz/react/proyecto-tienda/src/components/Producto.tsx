type ProductoProps = {
  nombre: string
  precio: number
  stock: number
}

function Producto({ nombre, precio, stock }: ProductoProps) {
  let estado = 'Disponible'
  if (stock === 0) estado = 'Agotado'
  else if (stock <= 3) estado = 'Últimas unidades'

  return (
    <div className="producto">
      <h3>{nombre}</h3>
      <p>{precio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
      <p>{estado}</p>
    </div>
  )
}

export default Producto
