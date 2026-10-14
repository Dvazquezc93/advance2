const modulos:string[]=['Desarrollo de interfaces','Acceso a datos', 'Programación de servicios y procesos']

function ListaMala() {
  return (
    <div>
        <h4>Modulos de 2º DAM: Mal mostrados</h4>
        <ul>
        {
            modulos.map((m)=>{return(<li key={m}>{m}</li>)})
        }
        </ul>
    </div>
  )
}

export default ListaMala