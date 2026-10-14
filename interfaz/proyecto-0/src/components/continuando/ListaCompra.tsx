import { useState } from "react"

type producto ={
    id:string
    nombre:string
}
const productos:producto[] =[
    {id:crypto.randomUUID(), nombre:"Leche"},
    {id:crypto.randomUUID(), nombre:"Pan"},
    {id:crypto.randomUUID(), nombre:"Monster"}
]

function ListaCompra() {
    const [nombre, setnombre] = useState<string>('')
    const [Articulos, setArticulos] = useState<producto[]>(productos)

  return (
    <div>
        <h3>lista de la compra</h3>
        <label>
        <ul>
            {productos.map((p)=><li key={p.id}>{p.nombre}<button>X</button></li>)}
        </ul>
        <input type="text" onChange={(e) => { setnombre(e.target.value) }} placeholder="Artículo"/>
        <button onClick={()=>setArticulos([...Articulos,{id:crypto.randomUUID(),nombre:nombre.trim()}])} >Añadir</button>
        </label>
        <ul>
            {Articulos.map(articulo=>
            <li key={articulo.id}>
                {articulo.nombre}<button onClick={()=>setArticulos(Articulos.filter(a => a.id !== articulo.id))}>X</button>
            </li>
            )}
        </ul>
    </div>
  )
}

export default ListaCompra