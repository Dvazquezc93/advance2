import React from 'react'
import type { prioridad } from './tipos'
type tareaItemProps ={
  texto:string
  prioridad?:prioridad
  hecha:boolean
  onToggle:()=>void
}
function TareaItem({texto,prioridad ='media', hecha, onToggle}:tareaItemProps) {
  return (
    <li onClick={onToggle}>{texto} {prioridad} {hecha &&'✔ hecha'}</li>
  )
}

export default TareaItem