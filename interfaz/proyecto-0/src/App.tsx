
import { useState } from 'react'
import './App.css'
import Aviso from './components/Aviso.tsx'
import Cabecera from './components/Cabecera.tsx'
import Catalogo from './components/Catalogo.tsx'
import InfoPersonal from './components/InfoPersonal'
import MisHobbies from './components/MisHobbies'
import Pie from './components/Pie.tsx'
import Precio from './components/Precio.tsx'
import Producto from './components/Producto'
import Saludo from './components/Saludo'
import SaludoConDatos from './components/SaludoConDatos'
import Tarjeta from './components/Tarjeta.tsx'
import Boton from './components/Boton.tsx'
import Contador from './components/Contador.tsx'



function App() {
    const [texto, setTexto] = useState('')

  return (
    <>
    <h3>OnChange</h3>
    <input type="text" onChange={(e)=>{setTexto(e.target.value)}}></input>
    <p>{texto}</p>
    <button onSubmit={(e)=>{setTexto{'Reinicio'}}}>texto :{texto}</button>
    </>
    
  )

}

export default App

 {/*
  const enDolares = (cantidad: number) => {
  return cantidad.toLocaleString('us-US', {
    style: 'currency',
    currency: 'USD'
  })
}
      <div>
     <Saludo></Saludo>

  <SaludoConDatos nombre='DANONINO'edad={32}></SaludoConDatos>

  <InfoPersonal nombre="Auron" ciudad="Zanarkad"descripcion="tener aura"></InfoPersonal>

  <MisHobbies hob1="Boxeo" hob2="Senderismo" hob3="videojuegos" hob4="leer comics"></MisHobbies>

  <Producto nombre="PS5" precio={100} disponible={true}></Producto>

  <Boton texto="Pulsa" ></Boton>
  <Boton texto="Pulsa" grande={true} ></Boton>
  <Boton texto="Pulsa" grande={true} variante="primario"></Boton>
  <Boton texto="Pulsa" grande={true} variante="secundario"></Boton>

  <Precio cantidad={130} formatear={enDolares}></Precio>
  <Precio cantidad={130.374382} formatear={(c)=> Math.round(c)+' €'}></Precio>

  <Tarjeta titulo="Horario">
    <p>De lunes a viernes de 8:00 a 15:00</p>
  </Tarjeta>

  <Aviso tipo="error" titulo='EL GRINCH'>
    ACERCANDOSE CRIATURA VERDE Y GRANDE
  </Aviso>
   <Cabecera titulo="Tienda del ciclo superior"></Cabecera>
      <Catalogo titulo="Tienda del cliclo">
        <Producto nombre="Cuaderno" disponible precio={3.45}></Producto>
        <Producto nombre="Libro" disponible precio={4.45}></Producto>
        <Producto nombre="Boligrafo" disponible precio={0.75}></Producto>
      </Catalogo>
      <Pie />
       <Contador></Contador>
    </div>*/}