import React, { useState } from 'react'

function EstadoUsuarioArray() {
    const animales = ["🦆","🐷","🐻", "🐶","🐱"]
    const [animalId, setAnimalId] = useState<number>(0)
    const cambiarAnimal =() => {
        (animalId===animales.length-1)?
        (setAnimalId(0)):
        (setAnimalId(animalId+1))
    }
  return (
    
    <div>
        <h3>Estado usuario Array</h3>
    <p>Su animal es : </p>
     <p>{animales[animalId]}</p>
        <button onClick={()=>{cambiarAnimal()}}>Cambiar animal </button>
         <br></br>
        <small>Fin de componente EstadoUsuarioArray</small>
    </div>
  )
}

export default EstadoUsuarioArray