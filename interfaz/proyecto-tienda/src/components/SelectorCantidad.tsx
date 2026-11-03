import { useState } from 'react'

type SelectorCantidadProps = {
  max: number
}

function SelectorCantidad({ max }: SelectorCantidadProps) {
  const [cantidad, setCantidad] = useState(1)

  return (
    <div className="selector">
      <button onClick={() => setCantidad(cantidad - 1)} disabled={cantidad === 1}>−</button>
      <span>Cantidad: {cantidad}</span>
      <button onClick={() => setCantidad(cantidad + 1)} disabled={cantidad === max}>+</button>
      {cantidad === max && <p>No quedan más unidades</p>}
    </div>
  )
}

export default SelectorCantidad
