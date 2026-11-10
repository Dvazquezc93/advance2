import { useEffect, useState } from "react"
import { api } from '../../api'
import axios from "axios"

type Usuario ={
    id:number
    name:string
    email:string
    address:{city:string}
}

function ListaUsuarios() {
    const [Usuario, setUsuario] = useState<Usuario[]>([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState<String|null>(null)
    useEffect(() => {
        let ignorar =false
        async function cargar() {
     try{
        const{data} = await api.get<Usuario[]>('/users')
        if(!ignorar) setUsuario(data)
     } catch(e){
        const mensaje =axios.isAxiosError(e) ? `Error ${e.response?.status} ?? ' de red'`:'Error desconocido'
        if(!ignorar) setError(mensaje)
    }finally{
      if(!ignorar) setCargando(false)
    }

       }
       cargar() 
       return()=>{ignorar =true}
    }, [])
    if(cargando) return<p>Cargando usuarios...</p>
    if(error) return <p>No se ha podido cargar los usuario:{error}</p>
    
    
  return (
    <div>
      <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>email</th>
          <th>ciudad</th>
        </tr>
      </thead>
      <tbody>
        
         {Usuario.map(e=>(<tr key={e.id}>
          <th>{e.name}</th>
           <th>{e.email}</th>
            <th>{e.address.city}</th>
          </tr>))} 
        
      </tbody>
      </table>
      </div>
  )
}

export default ListaUsuarios