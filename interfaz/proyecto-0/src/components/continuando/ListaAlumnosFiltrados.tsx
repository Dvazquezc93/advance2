import { useState } from "react"

type Alumno ={
    id:number
    nombre:string
    nota:number
}
const alumnos:Alumno[]=[
    {id:1, nombre:'Tidus',nota:6},
    {id:2, nombre:'Auron',nota:9},
    {id:3, nombre:'Yuna',nota:10},
    {id:3, nombre:'kimari',nota:0},

]


function ListaAlumnosFiltrados() {
    const [soloAprobados, setsoloAprobados] = useState<boolean>(false)
    const listaVisible= soloAprobados? alumnos.filter((a)=>a.nota>=5):alumnos
  return (
    
    <div>
        <h3>LOS ALUMNOS DE DAM</h3>
        <input type="checkbox" checked={soloAprobados} onChange={e=> setsoloAprobados(e.target.checked)}/>
       <table border={2}>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Nota</th>
               
                
            </tr>
        </thead>
        <tbody>
             {
                    listaVisible.map((a)=>{return(
                    <tr key={a.id}>
                        <td>{a.nombre}</td>
                        <td>{a.nota}</td>
                    </tr>
                    )})
                }
        </tbody>
       </table>
       {soloAprobados &&
       <p>{listaVisible.length} alumnos aprobado de {alumnos.length}</p>}
    </div>
  )
}

export default ListaAlumnosFiltrados