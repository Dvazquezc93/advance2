import { useState } from "react"

type Errores ={
  nombre?:string
  email?:string
  acepta?:string
}
function validar(nombre:string, email:string, acepta:boolean):Errores{
  const errores:Errores={}
  {nombre.trim()===''?errores.nombre="Debes completar este campo":''}
  {!email.includes('@')?errores.email="Debe haber un @":''}
  {!acepta ? errores.acepta="Tienes que aceptar las normas":''}
 return errores
}

function RegistroCompleto() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
   const [ciclo, setCiclo] = useState('')
  const [contacto, setContacto] = useState('')
  const [intento, setIntento] = useState(false)
   const [acepta, setAcepta] = useState(false)

  const errores =validar(nombre, email, acepta)
  const hayErrores= Object.keys(errores).length>0
  return (
    <div>
      <form onSubmit={e=>{e.preventDefault()
        setIntento(true)
        if(hayErrores) return
        setContacto(` Registrado: ${nombre} (${email}) matriculado en el ciclo ${ciclo}`)
        setNombre('')
        setEmail('')
        setCiclo('')
        setIntento(false)
      }}>
        <label htmlFor="nombre">Nombre</label><br></br>
        <input id="nombre" value={nombre} onChange={e=>{setNombre(e.target.value)}}></input><br></br>
        {intento&&errores.nombre&&<p >{errores.nombre}</p>}
         <label htmlFor="email">Email</label><br></br>
        <input id="email" value={email} onChange={e=>{setEmail(e.target.value)}}></input>
          {intento&&errores.email&&<p>{errores.email}</p>}
        <br></br><label htmlFor="ciclo">Ciclo</label><br></br>
        <select id="ciclo" onChange={e=>{setCiclo(e.target.value)}}>
            <option id="ciclo" value={ciclo} defaultChecked>DAM</option>
            <option id="ciclo" value={ciclo}>DAW</option>
            <option id="ciclo" value={ciclo} >ASIR</option>
        </select><br></br>
        <input type="checkbox" id="acepta" onChange={e=> setAcepta(e.target.checked)}></input>
        <label htmlFor="acepta">Acepto las normas del centro</label>
        {intento&&errores.acepta&&<p >{errores.acepta}</p>}
        <br></br><button type='submit'>Registrarse</button>
        {contacto&&<p>{contacto}</p>}
      </form></div>
  )
}

export default RegistroCompleto