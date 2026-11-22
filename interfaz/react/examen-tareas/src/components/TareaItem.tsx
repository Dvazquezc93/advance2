
import type { prioridad } from './tipo'
import "./TareaItem.css"
type TareaItemProps={
    texto:string
    hecha:boolean
    prioridad?:prioridad
    onToggle:()=>void
}
function TareaItem({texto,hecha, prioridad='media',onToggle}:TareaItemProps) {
  return (
    <div>
        <li onClick={onToggle}><span className='mitexto'>{texto}</span> ({prioridad}) {hecha &&'✔ hecha'}</li>
    </div>
  )
}

export default TareaItem