import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import type { tarea } from './components/tipos'
import ListaTareas from './components/ListaTareas'
import { api } from './api'
import { contarTareasPendientes } from './components/utils/tareas'



function App() {
 const [tareas, setTareas] = useState<tarea[]>([])
 const [cargando, setCargando] = useState(true)
 const [error, setError] = useState<string|null>(null)
 useEffect(() => {
async function cargar(){
  try {
    const {data}= await api.get<tarea[]>('/tareas')
    setTareas(data)
  } catch {
    setError('No se ha podido cargar')
  }finally{
    setCargando(false)
  }
}
cargar()
 }, [])
 
 function alternarHecha(id:string){
 setTareas(tareas.map((t)=> t.id ===id?{...t,hecha:!t.hecha}:t))
 }
if(cargando) return <p>cargando...</p>
    if(error) return <p>{error}</p>
  
  return (
  
    <><h1>Gestor de tareas</h1>
    <p>Pedientes : {contarTareasPendientes(tareas)}</p>
     <ListaTareas tareas={tareas} onToggle={alternarHecha}></ListaTareas>
    </>
  )
}

export default App
