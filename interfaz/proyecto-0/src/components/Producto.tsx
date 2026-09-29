type ProductoProps= {
    nombre: string
    precio: number
    disponible:boolean
    variante?: 'primario'| 'secundario'
}
function Producto({nombre, precio, disponible, variante} :ProductoProps){
    return(
        <div>
            <h3 >{nombre}</h3>
            <p>{precio.toLocaleString('es-ES', {style:'currency', currency:'EUR'})}</p>
            <p>{disponible ? 'En stock': 'agotado'}</p>
               <p>{variante} </p>
        </div>
    )
}
export default Producto