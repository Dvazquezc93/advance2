import React, { useEffect, useState } from 'react'

function Buscador() {
    const [tecleado, setTecleado] = useState('')
    const [buscado, setBuscado] = useState('')
    useEffect(() => {
        //Esperrar 500 ms
        const id= setTimeout(() => {
            setBuscado(tecleado)
        }, 500);
      
    //si el texto cambia en menos de 500 ms
      return () => {
        clearTimeout(id)
      }
    }, [tecleado])
    
  return (
    <div>
        <h3>Buscador</h3>
        <input value={tecleado} type='text' onChange={(e)=>{setTecleado(e.target.value)}}></input>
        <p>tecleado: {tecleado}</p>
        <p>A buscar : {buscado}</p>
        
    </div>
  )
}

export default Buscador