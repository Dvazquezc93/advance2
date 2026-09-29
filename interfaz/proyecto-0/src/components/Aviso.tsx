

type AvisoProps = {
    tipo: 'info' | 'exito' | 'error'
    titulo?: 'Aviso'
    children: ReactNode
}

const icono: Record<AvisoProps['tipo'], string> ={
    info: 'ℹ️',
        exito: '✅',
            error: '🚫'
};

function Aviso({ tipo, titulo, children }: AvisoProps) {
    return (
        <div>
            <h1>{icono[tipo]} {titulo}</h1>
            {children}
        </div>
    )
}

export default Aviso