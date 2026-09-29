
import './App.css'
import Aviso from './components/Aviso.tsx'
import InfoPersonal from './components/InfoPersonal'
import MisHobbies from './components/MisHobbies'
import Precio from './components/Precio.tsx'
import Producto from './components/Producto'
import Saludo from './components/Saludo'
import SaludoConDatos from './components/SaludoConDatos'
import Tarjeta from './components/Tarjeta.tsx'
import Boton from './components/boton.tsx'

const enDolares = (cantidad:number) => { 
   return cantidad.toLocaleString('us-US',{
        style:'currency',
        currency:'USD'
    })
}
function App() {
  

  return (
    <div>
  <Saludo></Saludo>
  <SaludoConDatos nombre='DANONINO'edad={32}></SaludoConDatos>
  <InfoPersonal nombre='Auron' ciudad='Zanarkad'descripcion='tener aura'></InfoPersonal>
  <MisHobbies hob1='Boxeo'hob2='Senderismo' hob3='videojuegos' hob4='leer comics'></MisHobbies>
  <Producto nombre='PS5' precio={100} disponible={true}></Producto>
  <Boton texto='Pulsa' ></Boton>
  <Boton texto='Pulsa' grande={true} ></Boton>
  <Boton texto='Pulsa' grande={true} variante='primario'></Boton>
  <Boton texto='Pulsa' grande={true} variante='secundario'></Boton>
  <Precio cantidad={130} formatear={enDolares}></Precio>
  <Precio cantidad={130.374382} formatear={(c)=> Math.round(c)+' €'}></Precio>
  <Tarjeta titulo='Horario' >
    <p>De lunes a viernes de 8:00 a 15:00</p>
  </Tarjeta>
  <Aviso tipo='error' titulo='CUIDADO CON EL GRINCH'></Aviso>
    </div>
   
   
    
  )
}

export default App
