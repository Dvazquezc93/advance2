import { useState } from "react"


function EstadoUsuario() {
    const [estado, setEstado] = useState<string>('🔴')
    const cambiarEstado = () =>{
        estado==='🔴'?setEstado('🟡'):''
        estado==='🟡'?setEstado('🟢'):''
        estado==='🟢'?setEstado('🔴'):''
    }
  return (
    <div>
        <h3>Estado Usuario</h3>
        <p>Estado : {estado}</p>
        <button onClick={()=>{cambiarEstado()}}>Cambiar estado</button>
        <br/>
        <small>Fin de componentes EstadoUsuario</small>
    </div>
  )
}

export default EstadoUsuario