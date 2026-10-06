import  { useState } from 'react'

function AlternarContenido () {
    const [claro, setClaro] = useState<boolean>(true)
  return (
    
    <div>
        <h3>Alternar contenido</h3>
        <p>El dia está:</p>
        {claro ?(<p>☀️</p>):(<p>🌧️</p>)}
        <button onClick={()=>(setClaro(!claro))}>Cambiar claridad</button>
        <br></br>
        <small>Fin de componente AlternarContenido</small>
    </div>
  )
}

export default AlternarContenido