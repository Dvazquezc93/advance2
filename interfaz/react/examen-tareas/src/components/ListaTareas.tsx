import React from 'react'
import type { tarea } from './tipos'
import TareaItem from './TareaItem'

type ListaTareasProps ={
    tareas:tarea[]
    onToggle:(id:string)=>void
}

function ListaTareas({tareas, onToggle}:ListaTareasProps) {
  return (
    
        <ul>
            {tareas.map((t)=>(
                <TareaItem texto={t.texto} key={t.id} prioridad={t.prioridad} hecha={t.hecha} onToggle={()=>onToggle(t.id)}></TareaItem>
            ))}
        </ul>

  )
}

export default ListaTareas