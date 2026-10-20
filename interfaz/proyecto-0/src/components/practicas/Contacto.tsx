import { useState } from 'react'

function Contacto() {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [contacto, setContacto] = useState('')
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

export default Contacto