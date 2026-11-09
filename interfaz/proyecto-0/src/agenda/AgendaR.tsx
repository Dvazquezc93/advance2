
import  { useEffect, useState } from 'react'

import type { Contacto, NuevoContacto } from './tipos'
import ListaContactosR from './ListaContactosR'
import { api } from './api'
import FormularioContactoR from './FormularioContactoR'


function AgendaR() {
    const [agenda, setAgenda] = useState<Contacto[]>([])
    useEffect(() => {
       api.get<Contacto[]>('/contactos')
       .then(resultado=>setAgenda(resultado.data))
    }, [])
    async function añadir(nuevo:NuevoContacto) {
        const {data} = await api.post<Contacto>('/contactos', nuevo)
        setAgenda([...agenda, data])
    }
    async function borrar(id:string) {
        await api.delete('/contactos/'+id)
        setAgenda(agenda.filter(a=>a.id!==id))
      
    }
    async function alternarFavorito(modificado:Contacto) {
        const {data} =await api.patch<Contacto>(`/contactos/${modificado.id}`, { favorito: !modificado.favorito })
        setAgenda(agenda.map(a=>(a.id===modificado.id? data:a)))
       
    }
  return (
    <div>
        <h1>Agenda</h1>
        <FormularioContactoR onGuardar={añadir} ></FormularioContactoR>
        <ListaContactosR contactos={agenda} onBorrar={borrar} onFavorito={alternarFavorito}></ListaContactosR>
        
    </div>
  )
}

export default AgendaR