type Alumno ={
    id:number
    nombre:string
    nota:number
}
const alumnos:Alumno[]=[
    {id:1, nombre:'Tidus',nota:6},
    {id:2, nombre:'Auron',nota:9},
    {id:3, nombre:'Yuna',nota:10}

]


function ListaAlumno() {
  return (
    <div>
        <h3>LOS ALUMNOS DE DAM</h3>
       <table border={2}>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Nota</th>
               
                
            </tr>
        </thead>
        <tbody>
             {
                    alumnos.map((a)=>{return(
                    <tr key={a.id}>
                        <td>{a.nombre}</td>
                        <td>{a.nota}</td>
                    </tr>
                    )})
                }
        </tbody>
       </table>
    </div>
  )
}

export default ListaAlumno