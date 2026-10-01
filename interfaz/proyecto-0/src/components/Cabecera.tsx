
type cabeceraProps ={
    titulo: string
    lema?: string
}


function Cabecera({titulo,lema='Todo lo que necesitas para clase'}:cabeceraProps) {
  return (
    <div className="cabecera">
        <h1>{titulo}</h1>
        <p>{lema}</p>

    </div>
  )
}

export default Cabecera