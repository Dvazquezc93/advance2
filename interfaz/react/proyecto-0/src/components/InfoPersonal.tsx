type InfoProps = {
    nombre: string
    ciudad: string
    descripcion: string
}

function InfoPersonal({ nombre, ciudad, descripcion }: InfoProps) {
    return (
        <>
            <p>----------------</p>
            <p>Nombre: {nombre}</p>
            <p>Ciudad: {ciudad}</p>
            <p>Descripción: {descripcion}</p>
        </>
    )
}
export default InfoPersonal