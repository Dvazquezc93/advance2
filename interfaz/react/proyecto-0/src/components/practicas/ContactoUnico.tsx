import { useState } from 'react'
type datosProps={
  nombre:string
  email:string
}
function ContactoUnico() {
    const [datos, setDatos] = useState<datosProps>({nombre:'',email:''})
    const [contacto, setContacto] = useState('')
    function cambiar(e:any){
      const {name,value}= e.target
      setDatos({...datos,[name]:value})
    }
  return (
    <div>
    <form onSubmit={(e)=>{e.preventDefault(),setContacto(`${datos?.nombre} (${datos?.email})`)}}>
        <label htmlFor='nombre'>Nombre</label><br></br>
        <input id="nombre" name="nombre" value={datos?.nombre} onChange={cambiar}></input><br></br>
         <label htmlFor="email">Email</label><br></br>
          <input id="email" name ="email" value={datos?.email} onChange={cambiar}></input>
          <button type="submit">Enviar</button>
         
    </form>
    <p>{contacto}</p>
    </div>
  )
}

export default ContactoUnico