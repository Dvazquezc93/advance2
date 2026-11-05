import { useState } from 'react'

type SelectorDiasProps = {
  max?: number
}

function SelectorDias({ max = 14 }: SelectorDiasProps) {
  const [dias, setDias] = useState(7)

  return (
    <div className="selector">
      <button onClick={() => setDias(dias - 1)} disabled={dias === 1} aria-label="Menos días">−</button>
      <span>Días: {dias}</span>
      <button onClick={() => setDias(dias + 1)} disabled={dias === max} aria-label="Más días">+</button>
      {dias === max && <p>Préstamo máximo: {max} días</p>}
    </div>
  )
}

export default SelectorDias
