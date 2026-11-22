import { useEffect, useState } from 'react'
import './App.css'
import type { NuevaTarea, tarea } from './components/tipo'
import { api } from './api'
import { contarPendientes } from './components/tarea'
import { FormularioTarea, ListasTareas } from './components'

function App() {
  const [tareas, setTareas] = useState<tarea[]>([])
  const [cargando, setCargado] = useState<boolean>(true)
  const [error, setError] = useState<string| null>(null)
  useEffect(() => {
    async function cargar() {
      try {
        const {data}= await api.get<tarea[]>("/tareas")
        setTareas(data)
      } catch  {
        setError('No se han podido cargar')
      } finally{
        setCargado(false)
      }
    }
    cargar()
  }, [])
  async function crear(nuevo:NuevaTarea) {
    const {data}= await api.post<tarea>("/tareas", nuevo)
    setTareas([...tareas,data])
  }

function alternarhecha(id:String) {
  setTareas(tareas.map(t=>t.id===id?{...t,hecha:!t.hecha}:t))
}
if (cargando) return<p>Cargando...</p>
if (error)return<p>{error}</p>
  return (
    <>
    <h1>GESTOR DE TAREAS</h1>
    <p>Tareas pendientes: {contarPendientes(tareas)}</p>
    <ListasTareas tareas={tareas} onToggle={alternarhecha}></ListasTareas>
    <FormularioTarea onGuardar={crear} ></FormularioTarea>
    </>
  )
}

export default App
