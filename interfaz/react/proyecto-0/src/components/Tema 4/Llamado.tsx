import React, { useEffect, useState } from 'react'

function Llamado() {
    const [contador, setContador] = useState(0)
    const [likes, setLikes] = useState(0)
 //Montaje y desmontaje
    useEffect(() => {
     console.log('1:Montando')
    
      return () => {
        console.log('1:Desmontaje')
      }
    }, [])
    
    //2 renderizado
     useEffect(() => {
     console.log('2:Renderizado')})

     //Dpendencia de un estado
     useEffect(() => {
        console.log('3:Renderizando ')

    }, [contador])

    
  return (
    <div>
        <h3>Llamado</h3>
        <button onClick={()=>{setContador(contador+1)}}>+1</button>
        <button onClick={()=>{setLikes(likes+1)}}>+1 Like</button>
        <p>contador: {contador}</p>
        <p>Likes: {likes}</p>
    </div>
  )
}

export default Llamado