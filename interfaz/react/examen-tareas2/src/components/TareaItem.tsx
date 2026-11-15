import "./TareasItem.css"
import type { Prioridad } from './tipo'
type TareaItemProps={
    texto:string
    prioridad?:Prioridad
    hecha:boolean
    onToggle:()=>void
}

function TareaItem({texto,prioridad='media',hecha,onToggle}:TareaItemProps) {
  return (
    <li onClick={onToggle}><span className='mi-texto'>{texto}</span> ({prioridad}) {hecha&&'✔ hecha'}</li>
  )
}

export default TareaItem