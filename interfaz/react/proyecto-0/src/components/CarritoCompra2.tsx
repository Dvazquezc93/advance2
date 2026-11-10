import { useState } from "react"
import Catalogo from "./Catalogo"

type catalogoProps ={
    id:string
    nombre:string
    precio:number
    cantidad:number
}
const catalogo:catalogoProps[] =[
    {id:crypto.randomUUID(), nombre:'Teclado mecánico', precio:45, cantidad:3},
     {id:crypto.randomUUID(), nombre:'Ratón inalámbrico', precio:20, cantidad:2},
      {id:crypto.randomUUID(), nombre:'Monitor 24"', precio:24, cantidad:1},
       {id:crypto.randomUUID(), nombre:'Auriculares', precio:35, cantidad:0},
]

function CarritoCompra2() {
    const carritoCompra:catalogoProps[]=[]
    const [carrito, setCarrito] = useState<catalogoProps[]>(carritoCompra)
    const [cata, setcata] = useState<catalogoProps[]>(catalogo)
        let total :number=0
       for(const carro of carrito){
        total+=carro.precio*carro.cantidad
       }
  return (
    <div>
        <h3>Catálogo</h3>
        <ul>
            {cata.map((c)=><li key={c.id}>{c.nombre} - {c.precio} € (quedan {c.cantidad}) 

            {!carrito.some(item=> item.id === c.id) &&<button onClick={()=>{setCarrito([...carrito,{...c, cantidad:1}]);
            setcata(cata.map(item=>item.id==c.id?{...item,cantidad: item.cantidad-1}:item))}} disabled={c.cantidad===0}>Añadir</button>} 

            {carrito.some(item=> item.id === c.id) &&<button onClick={()=>{setCarrito(carrito.map(ca=> ca.id===c.id?{...ca, cantidad:ca.cantidad+1}:ca));
            setcata(cata.map(item=>item.id==c.id?{...item,cantidad: item.cantidad-1}:item))}} disabled={c.cantidad===0}>añadir</button>}</li>)}
        </ul>
        <h3>Carrito</h3>
        <ul>
            {carrito.length===0 &&<p>El carrito está vació</p>}
            {carrito.length>0 && carrito.map((c)=><li key={c.id}>{c.nombre} -  X {c.cantidad} :{c.precio*c.cantidad} € <button onClick={()=>{setCarrito(carrito.map((ca)=> ca.id===c.id?{...ca, cantidad:ca.cantidad-1}:ca).filter(ca=>ca.cantidad>0)); setcata(cata.map(item=>item.id==c.id?{...item,cantidad: item.cantidad+1}:item))}}>Quitar uno</button><button onClick={()=>{setCarrito(carrito.filter(ca=>ca.id !== c.id));
                setcata(cata.map(item=>item.id==c.id?{...item,cantidad: item.cantidad+c.cantidad}:item))}}>Quitar Todos</button></li>)}
            {carrito.length>0&&<p>total: {total} €</p>}
        </ul>
    </div>
  )
}

export default CarritoCompra2