import { useState } from "react"

type Errores ={
  nombre?:string
  email?:string
}
function validar(nombre:string, email:string):Errores{
  const errores:Errores={}
  {nombre.trim()===''?errores.nombre="Debes completar este campo":''}
  {!email.includes('@')?errores.email="Debe haber un @":''}
 return errores
}

function Registro() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [contacto, setContacto] = useState('')
  const [intento, setIntento] = useState(false)

  const errores =validar(nombre, email)
  const hayErrores= Object.keys(errores).length>0
  return (
    <div>
      <form onSubmit={e=>{e.preventDefault()
        setIntento(true)
        if(hayErrores) return
        setContacto(`${nombre} (${email})`)
        setNombre('')
        setEmail('')
        setIntento(false)
      }}>
        <label htmlFor="nombre">Nombre</label><br></br>
        <input id="nombre" value={nombre} onChange={e=>{setNombre(e.target.value)}}></input><br></br>
        {intento&&errores.nombre&&<p >{errores.nombre}</p>}
         <label htmlFor="email">Email</label><br></br>
        <input id="email" value={email} onChange={e=>{setEmail(e.target.value)}}></input>
          {intento&&errores.email&&<p>{errores.email}</p>}
        <button type='submit'>Registrarse</button>
        {contacto&&<p>{contacto}</p>}
      </form></div>
  )
}

export default Registro