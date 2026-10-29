
import  { useEffect, useState } from 'react'
import { api } from '../api'
import type { Contacto } from './tipos'

function AgendaR() {
    const [agenda, setAgenda] = useState<Contacto[]>([])
    useEffect(() => {
       api.get<Contacto[]>('/contactos')
       .then(resultado=>setAgenda(resultado.data))
    }, [])
    
  return (
    <div>
        <h1>Agenda</h1>
        {agenda.map(e=>(
            <li key={e.id}>
                <p>{e.nombre}-{e.telefono}</p>
            </li>
        ))}
    </div>
  )
}

export default AgendaR