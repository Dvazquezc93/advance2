import type { ReactNode } from "react"


type CatalogoProps ={
    titulo :string
    children: ReactNode
}

function Catalogo({titulo, children}:catalogoProps) {
  return (
    <div>
        <h2>{titulo}</h2>
        <div className="productos">
            {children}
        </div>
    </div>
  )
}

export default Catalogo