type PieProps = {
    texto?: string
}

function Pie({ texto = 'Tienda del ciclo curso 26/27' }: PieProps) {
    return (

        <footer>
            {texto}
        </footer>

    )
}

export default Pie