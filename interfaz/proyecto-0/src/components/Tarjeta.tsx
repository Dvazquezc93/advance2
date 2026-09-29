import type { ReactNode } from "react"

type TarjetaProps={
    titulo:string
    children: ReactNode
}

function Tarjeta({titulo,children}: TarjetaProps ) {
  return (
    <section className="tarjeta">
        <h2>{titulo}</h2>
        {children}
    </section>
    //children te deja compilar html dentro del componente
  )
}

export default Tarjeta