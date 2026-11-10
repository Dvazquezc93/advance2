import { type Contacto } from "./tipos"
type ListaConProps ={
    contactos: Contacto[]
    onBorrar:(id:string)=>void
    onFavorito:(contacto:Contacto)=>void
}
function ListaContactosR({contactos, onBorrar, onFavorito}:ListaConProps) {
    if(contactos.length===0) return <p> La agenda esta vacía</p>
  return (
    <div>
        <ul>
            {contactos.map(c=>(
                <li key={c.id}>
                    {c.nombre}-{c.telefono}
                    <button onClick={()=>onFavorito(c)}>{c.favorito?'★' : '☆'}</button>
                    <button onClick={()=> onBorrar(c.id)}aria-label={`borrar el contacto ~${c.nombre}`}>X</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ListaContactosR