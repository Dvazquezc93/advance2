import type { Tarea } from "./tipo"
import TareaItem from "./TareaItem"
type ListaTareasProps={
    tareas:Tarea[]
    onToggle:(id:string)=>void
}

function ListaTareas({tareas,onToggle}:ListaTareasProps) {
  return (
    <ul>
        {tareas.map((t)=>(
            <TareaItem key={t.id} texto={t.texto} prioridad={t.prioridad} hecha={t.hecha} onToggle={()=> onToggle(t.id)}></TareaItem>
        ))}
    </ul>
  )
}

export default ListaTareas