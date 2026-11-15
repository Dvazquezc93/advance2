import { useEffect, useState } from 'react'
import './App.css'
import { ListaTareas, FormularioTarea } from './components'

import  type { NuevaTarea, Tarea } from './components/tipo'
import { api } from './api'
import { contarPendientes } from './components/Tareas'


function App() {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<String |null>(null)
useEffect(() => {
  async function cargar() {
    try {
  const {data}= await api.get<Tarea[]>('/tareas')
  setTareas(data)
 } catch  {
  setError('No se han podido cargar')
 }finally{
  setCargando(false)
 }
  }
 cargar()
}, [])
 async function añadir(nuevo:NuevaTarea) {
  const {data}= await api.post<Tarea>('/tareas', nuevo)
  setTareas([...tareas, data])
 }
  function alternarHecha(id:string){
    setTareas(tareas.map((t)=>
      t.id===id ?{...t,hecha:!t.hecha}:t      
    ))
  }
  if(cargando) return <p> Cargado...</p>
  if(error) return <p>{error}</p>
  return (
    <>
    <h1>Gestor de tareas</h1>
    <p> Numero de pendientes: {contarPendientes(tareas)}</p>
     <ListaTareas tareas={tareas} onToggle={alternarHecha}></ListaTareas>
     <FormularioTarea OnGuardar={añadir}></FormularioTarea>
    </>
  )
}

export default App
