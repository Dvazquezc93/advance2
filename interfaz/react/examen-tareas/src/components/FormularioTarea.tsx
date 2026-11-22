import { useState } from 'react'
import type { NuevaTarea } from './tipo'
import type { SubmitEvent } from 'react'
type FormularioTareaProps ={
    onGuardar:(tarea:NuevaTarea)=>void
}
function FormularioTarea({onGuardar}:FormularioTareaProps) {
    const [texto, setTexto] = useState('')
    function enviar(e:SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if (texto.trim()==='') return
        onGuardar({texto:texto, hecha:false, prioridad:'media'})
        setTexto('')
    }
  return (
    <div>
        <form onSubmit={enviar}>
            <input value={texto} onChange={e=> setTexto(e.target.value)} placeholder='Nueva tarea'></input>
            <button type='submit'>Añadir</button>
        </form>
    </div>
  )
}

export default FormularioTarea