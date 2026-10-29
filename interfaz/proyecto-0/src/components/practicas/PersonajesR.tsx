import  { useEffect, useState } from 'react'
import axios from 'axios'
type rickProps ={
    id:number
    name:string
    status:string
    species:string
    image:string

}

function PersonajesR() {
    const [personajes, setPersonajes] = useState<rickProps[]>([])
    useEffect(() => {
     axios.get<{results :rickProps[]}>('https://rickandmortyapi.com/api/character')
     .then(results => setPersonajes(results.data.results))
    }, [])
    
  return (
    <div>
        <h1>Personajes</h1>
        {personajes.slice(0,10).map((e)=>(
            <li key={e.id}>
                <img src={e.image} alt={e.name} width={48}/>
                <p>{e.name}-{e.species}({e.status})</p>
            </li>
        ))}

       
    </div>
  )
}

export default PersonajesR