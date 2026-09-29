type BotonProps = {
    texto: string
    variante?: 'primario' | 'secundario'
    grande?: boolean
}
function Boton({ texto, variante, grande }: BotonProps) {
    return <button className={`boton ${variante}${grande ? 'grande' : ''}`}>{texto}</button>
}
export default Boton