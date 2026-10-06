import  { useState } from 'react'

function MostrarOcultar() {
    const [visible, setVisible] = useState<boolean>(true)
  return (
    <div>
        <h3>Mostar y Ocultar</h3>
        {visible && (<p>Este párrafo es visible ahora</p>)}
         {!visible && (<p>Aunque me ves no estoy</p>)}
        <button onClick={()=>{setVisible(!visible)}} >Cambiar visibilidad</button>
        <br></br>
        <small>Fin de componentes MostrarOcultar</small>
    </div>
  )
}

export default MostrarOcultar