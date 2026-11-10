import { useState } from "react"
import type { Contacto, NuevoContacto } from "./tipos"

type FormularioContactoRProps ={
    onGuardar:(Contacto:NuevoContacto) =>void
}
function FormularioContactoR({onGuardar}:FormularioContactoRProps) {
    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')
  return (
    <div>
        <form  onSubmit={e=>{
         e.preventDefault()
         if (nombre.trim()==='' || telefono.trim()==='') return
         onGuardar({nombre:nombre.trim(), telefono:telefono.trim(), favorito:false})
         setNombre('')
         setTelefono('')
        }
        }>
            <input value={nombre} onChange={e=>{setNombre(e.target.value)}} placeholder="Tu nombre"/><br></br>
            <input value={telefono} onChange={e=>{setTelefono(e.target.value)}} placeholder="Tu teléfono "/><br></br>
            <button type="submit">añadir</button>
        </form>
    </div>
  )
}

export default FormularioContactoR