import React, { useState } from 'react'

function EjemploImput() {
    const [texto,setTexto] = useState<string>('')
     const [texto2,setTexto2] = useState<string>('')
  return (
    <div>
    <h3>Ejemplo OnChange</h3>
    <input type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setTexto(e.target.value)}} placeholder='Introduzca un texto...'></input>
    <p>Escribiste esto:<br></br>{texto}</p>
    <input type="text" onChange={(a:React.ChangeEvent<HTMLInputElement>)=>{setTexto2(a.target.value)}} placeholder='Introduzca un texto...'></input>
    <p>Escribiste esto:<br></br>{texto2}</p>
    <small>Fin del componente EjemploImput</small>
    </div>
  )
}

export default EjemploImput