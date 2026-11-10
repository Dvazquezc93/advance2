import React, { useState } from 'react'

function EjemploParametros() {
    const [semaforo, setsemaforo] = useState<string>('')
    const cambiarColor =(c:string)=>{
        setsemaforo(c)
    }
  return (
    <div>
        <h3>Ejemplo Parametros</h3>
        <p>{semaforo}</p>
        <button onClick={()=>{cambiarColor('🔴')}}>Rojo</button>
        <button onClick={()=>{cambiarColor('🟡')}}>Amarillo</button>
        <button onClick={()=>{cambiarColor('🟢')}}>Verde</button>
    </div>
  )
}

export default EjemploParametros