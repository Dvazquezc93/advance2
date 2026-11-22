import TareaItem from "./TareaItem"
import type { tarea } from "./tipo"

type ListasTareasProps ={
    tareas:tarea[]
    onToggle:(id:string)=>void

}

function ListasTareas({tareas, onToggle}:ListasTareasProps) {
  return (
    <ul>
        {tareas.map(t=>(
            <TareaItem key={t.id} texto={t.texto} prioridad={t.prioridad} hecha={t.hecha} onToggle={()=> onToggle(t.id)}></TareaItem>
        ))}
    </ul>
  )
}

export default ListasTareas