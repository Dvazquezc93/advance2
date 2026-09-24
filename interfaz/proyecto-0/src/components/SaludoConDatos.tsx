type SaludoProps ={
    nombre :string
    edad : number
}
function SaludoConDatos({nombre, edad}:SaludoProps) {

    return(
        <>
            <h2 className="atencion"> Componente con parámetros</h2>
            <p>Hola,  soy {nombre} y soy {edad>=18 ? 'mayor': 'menor'} de edad</p>
        </>
    )
}
export default SaludoConDatos