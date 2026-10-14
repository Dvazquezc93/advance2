import { useState } from "react"

type catalogoProps ={
    id:string
    nombre:string
    precio:number
}
const catalogo:catalogoProps[] =[
    {id:crypto.randomUUID(), nombre:"Teclado mecánico", precio:45},
     {id:crypto.randomUUID(), nombre:"Ratón inalámbrico", precio:20},
      {id:crypto.randomUUID(), nombre:"Monitor 24", precio:24},
       {id:crypto.randomUUID(), nombre:"Auriculares", precio:35},
]

function CarritoCompra() {
    const carritoCompra:catalogoProps[]=[]
    const [carrito, setCarrito] = useState<catalogoProps[]>(carritoCompra)
    const [Total, setTotal] = useState(0)
  return (
    <div>
        <h3>Catálogo</h3>
        <ul>
            {catalogo.map((c)=><li key={c.id}>{c.nombre} - {c.precio} €<button onClick={()=>{setCarrito([...carrito,{id:crypto.randomUUID(),nombre:c.nombre, precio:c.precio}]);setTotal(Total+c.precio)}}>Añadir</button></li>)}
        </ul>
        <h3>Carrito</h3>
        <ul>
            {carrito.length===0 &&<p>El carrito está vació</p>}
            {carrito.length>0 && carrito.map((c)=><li key={c.id}>{c.nombre} - {c.precio} €<button onClick={()=>{setCarrito(carrito.filter(ca=>ca.id !== c.id)); setTotal(Total - c.precio);}}>Quitar</button></li>)}
            {carrito.length>0&&<p>total: {Total} €</p>}
        </ul>
    </div>
  )
}

export default CarritoCompra