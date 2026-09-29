const enEuros = (cantidad:number) => { 
   return cantidad.toLocaleString('es-ES',{
        style:'currency',
        currency:'€'
    })
}
type PrecioProps={
    cantidad:number
    formatear?:(cantidad:number)=>string
}

function Precio({cantidad, formatear= enEuros}:PrecioProps) {
    return (
        <div>{formatear(cantidad)}
        </div>
    )
}

export default Precio