type Modulo= {
    id:number
    nombre:string
}

const modulos:Modulo[]=[
    {id:0,nombre:'Desarrollo de interfaces'},
    {id:1,nombre:'Acceso a datos'},
    {id:2,nombre:'Programación de servicios y procesos'}
     ]

function ListaBuena() {
  return (
    <div>
        <h4>Modulos de 2º DAM: Mal mostrados</h4>
        <ul>
        {
            modulos.map((m)=>{return(<li key={m.id}>{m.nombre}</li>)})
        }
        </ul>
    </div>
  )
}

export default ListaBuena