import { useState, type SubmitEvent } from 'react'
import type { NuevaTarea } from './tipo'
type FormularioTareaProps={
    OnGuardar:(tarea:NuevaTarea)=>void
}

function FormularioTarea({OnGuardar}:FormularioTareaProps) {
    const [texto, setTexto] = useState<string>('')
    function enviar(e:SubmitEvent<HTMLFormElement>){
e.preventDefault()
if (texto.trim() === '') return
OnGuardar({texto:texto,prioridad:'media',hecha:false})
setTexto('')
}
  return (
    <div>
        <form onSubmit={enviar}>
            <input value={texto} onChange={(e)=>{setTexto(e.target.value)}}></input>
            <button type='submit'>Añadir</button>
         </form>
         </div>
  )
}

export default FormularioTarea