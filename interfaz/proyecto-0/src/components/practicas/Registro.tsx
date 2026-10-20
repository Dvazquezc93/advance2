import  { useState } from 'react'
type errorProps={
  nombre:string
  email:string
}
function validar(nombre:string, email:String):errores{
    const errores:errorProps={nombre:'', email:''}
    if (nombre.trim()==='') errores.nombre='Se debe introducir nombre'
    if (!email.includes('@'))errores.email ='Se debe incluir un @'
    return errores
}
function Registro() {
   const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [contacto, setContacto] = useState('')
    const [intento, setIntento] = useState(false)
  return (
    <div>
    <form onSubmit={(e)=>{e.preventDefault(),setContacto(`${nombre} (${email})`)}}>
        <label htmlFor='nombre'>Nombre</label><br></br>
        <input id="nombre" value={nombre} onChange={(e)=>(setNombre(e.target.value))}></input><br></br>
         <label htmlFor="email">Email</label><br></br>
          <input id="email" value={email} onChange={(e)=>(setEmail(e.target.value))}></input>
          <button type="submit">Enviar</button>
         
    </form>
    <p>{contacto}</p>
    </div>
  )
}

export default Registro