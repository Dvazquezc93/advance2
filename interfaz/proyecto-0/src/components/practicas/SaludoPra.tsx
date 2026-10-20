import { useState } from 'react'

function SaludoPra() {
    const [texto, setTexto] = useState('')
    const [nombre, setNombre] = useState('')

  return (
    <>
    <form onSubmit={e=>{e.preventDefault() ,setNombre(`Hola ${texto}`), setTexto('')}}>
        <label htmlFor="texto">Nombre</label><br></br>
        <input id="texto" value={texto} onChange={(e)=>(setTexto(e.target.value))}></input>
        <button type="submit" >Saludo</button><br></br>
    </form>
    <p>{nombre}</p>
    </>
  )
}

export default SaludoPra