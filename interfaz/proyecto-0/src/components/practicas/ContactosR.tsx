import axios from "axios"
import { useEffect, useState } from "react"

type contacProps ={
    name:{first:string 
        last:string
    }
    location:{ country:string}
    picture:{thumbnail:string}
}
function ContactosR() {
    const [contactos, setContactos] = useState<contacProps[]>([])
    useEffect(() => {
     axios.get<{results: contacProps[]}>('https://randomuser.me/api/?results=6')
     .then(resultados=> setContactos(resultados.data.results))
    }, [])
    
  return (
    <div>
        <h1>Contactos</h1>
        {contactos.map(e=>(
            <li key={e.picture.thumbnail}>
                <img src={e.picture.thumbnail} alt={e.name.first}width={48}/>
                <p>{e.name.first} {e.name.last}-{e.location.country}</p>
            </li>
        ))}
    </div>
  )
}

export default ContactosR