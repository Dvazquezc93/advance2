import axios from 'axios'
import  { useEffect, useState } from 'react'

function PerrosR() {
    const [perros, setPerros] = useState<string[]>([])
    useEffect(() => {
      axios.get<{message:string[]}>('https://dog.ceo/api/breeds/image/random/6')
      .then(resultado => setPerros(resultado.data.message))
    
    }, [])
    
  return (
    <div>
        <h1>Perros de raza hound</h1>
        {perros.map(e=>(
            <img key={e}src={e}alt='un perro' width={48}/>
        ))}
    </div>
  )
}

export default PerrosR