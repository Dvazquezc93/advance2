
import './App.css'
import InfoPersonal from './components/InfoPersonal'
import MisHobbies from './components/MisHobbies'
import Saludo from './components/Saludo'
import SaludoConDatos from './components/SaludoConDatos'

function App() {
  

  return (
    <div>
  <Saludo></Saludo>
  <SaludoConDatos nombre='DANONINO'edad={32}></SaludoConDatos>
  <InfoPersonal nombre='Auron' ciudad='Zanarkad'descripcion='tener aura'></InfoPersonal>
  <MisHobbies hob1='Boxeo'hob2='Senderismo' hob3='videojuegos' hob4='leer comics'></MisHobbies>
            
    </div>
   
   
    
  )
}

export default App
