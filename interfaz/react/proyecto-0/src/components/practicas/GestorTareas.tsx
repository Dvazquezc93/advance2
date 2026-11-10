import { useRef, useState } from 'react'
type tareaProps={
    tarea:string
    prioridad:string
    urgencia:boolean
    id:number
    hecha:boolean
}
type error ={
    tarea?:string
}
function validar(tarea:string):error{
   const Errores:error={}
   tarea.trim()===''?Errores.tarea='Escribe el textio de la tarea':''
   return Errores
}
function GestorTareas() {
    const [tarea, setTarea] = useState('')
    const [prioridad, setPrioridad] = useState('')
    const [urgencia, setUrgencia] = useState<boolean>(false)
    const [filtro, setFiltro] = useState('')
    const [id, setID] = useState(1)
     const [hecha, setHecha] = useState<boolean>(false)
    const errores =validar(tarea)
    const hayError = Object.keys(errores).length>0
     const [intento, setIntento] = useState<boolean>(false)
   const [tareas, setTareas] = useState<tareaProps[]>([])
    const añadir:tareaProps={tarea:tarea.trim(),prioridad:prioridad,urgencia:urgencia,id:id, hecha:hecha}
   const visible=filtro==='Todas'?tareas:tareas?.filter((e)=>e.prioridad===filtro)
   const tareaRef = useRef<HTMLInputElement>(null)
   const pendientes =tareas?.filter((e)=>!e.hecha).length
  return (
    <div>
        <h1>Gestor de tareas</h1>
        <form onSubmit={(e)=>{ e.preventDefault()
            setIntento(true)
            if(!hayError){
           tareas?.push(añadir)
            setIntento(false)
            setID(id+1)}
            else{
                tareaRef.current?.focus();
                return
            }
            
        }}>
            <label htmlFor='nombre'>Tarea</label><br></br>
            <input ref={tareaRef} id='nombre'value={tarea} onChange={(e)=>{setTarea(e.target.value)}}></input><br></br>
            {intento&& errores.tarea&&<p>{errores.tarea}</p>}
            <label htmlFor='prioridad'>Prioridad</label><br></br>
            <select  id='prioridad' value={prioridad} onChange={(e)=>{setPrioridad(e.target.value)}}><br></br>
                <option id='prioridad' value="Alta">Alta</option>
                <option id='prioridad' value="Media">Media</option>
                <option id='prioridad' value="Baja">Baja</option>
            </select><br></br>
            <input  id='urgente' type='checkbox'onChange={(e)=>{setUrgencia(e.target.checked)}}></input>
            <label htmlFor='urgente'>Urgente</label><br></br>
            <button type='submit'>Añadir tarea</button>
        </form>
         <form>
        <h1>Tareas</h1>
        <label htmlFor='filtro'>Mostrar</label>
        <select id ='filtro' onChange={(e)=>setFiltro(e.target.value)}>
            <option value="Todas" defaultChecked>Todas</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
        </select>
        <p>Pendiente:{pendientes} de {tareas?.length}</p>
        {tareas.length===0 && <p>no hay tareas</p>}
         {tareas.length>0&&visible?.length===0&& <p>no hay tareas con esa prioridad.</p>}
         <ul>
         {visible.length>0 &&visible.map((v)=><li><input type='checkbox' onChange={(e)=>tareas.map((t)=>t.id===v.id?{...t,hecha:e}:t)}></input>
         <span style={{textDecoration:v.hecha?'line -throught':'none'}}>{v.tarea} ({v.prioridad}){v.urgencia&&<strong>¡URGENTE!</strong>}</span>
         <button onClick={()=> tareas.filter((e)=>e.id !==v.id)}>Borrar</button></li>)
         

         }
        </ul>
         
       
       
       
        
        </form>
    </div>
  )
}

export default GestorTareas