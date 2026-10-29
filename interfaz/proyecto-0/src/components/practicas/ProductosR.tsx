import axios from 'axios'
import  { useEffect, useState } from 'react'
type produProps ={
    id:number
    title:string
    price:number
    category:string
    thumbnail:string 

}

function ProductosR() {
    const [producto, setProducto] = useState<produProps[]>([])
    useEffect(() => {
    axios.get<{products: produProps[]}>('https://dummyjson.com/products?limit=6')
    .then(respuesta=> setProducto(respuesta.data.products))
    }, [])
    
  return (
    <div>
        <h1>ProductosR</h1>
        {producto.map(e=>(
            <li key={e.id}>
                <img src={e.thumbnail} alt={e.title} width={48}/>
                <p>{e.title}-{e.price}({e.category})</p>
            </li>
        ))}
    
    </div>
  )
}

export default ProductosR