import React, { useEffect, useState } from 'react'

function Cronometro() {
    const [cronometro, setCronometro] = useState(0)
    const [corriendo, setCorriendo] = useState(false)
    
    useEffect(() => {
        if(!corriendo) return
    const id= setInterval(() => {
        setCronometro(cronometro=>cronometro+1)
    }, 1000);
    
      return () => {
        clearTimeout(id)
      }
    }, [corriendo])
    
  return (
    <div>
        <p>{cronometro} s</p>
        <button onClick={()=>setCorriendo(!corriendo)}>{corriendo?'Pausar':'Iniciar'}</button>

    </div>
  )
}

export default Cronometro