type ProducProps= {
    nombre: string
    precio: number
    disponible:boolean
}
function Producto({nombre, precio, disponible} :ProductoProps){
    return(
        <div>
            <h2 className="atencion">Mi primer componente</h2>
            <p>Descripcion de mi primer componente</p>
        </div>
    )
}
export default Producto