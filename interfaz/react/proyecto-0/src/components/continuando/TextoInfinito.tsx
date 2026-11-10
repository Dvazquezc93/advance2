import React, { useState } from 'react'

function TextoInfinito() {
    const [texto, setTexto] = useState<string>("QUE")
  return (
    <div>
 <h3>Texto Infinito</h3>
    <p>{texto}</p>
     
        <button onClick={()=>{setTexto( texto + "E")}}>añadir letra </button>
         <br></br>
        <small>Fin de componente TextoInfinito</small>
    </div>
  )
}

export default TextoInfinito