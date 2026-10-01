import { useState } from 'react'
type ContadorProps = {
    titulo?: string
    valorInicial?: number
    step?: number
    max: number

}

function Contador({ titulo = 'Boton', valorInicial = 0, step = 1000, max }: ContadorProps) {
    //contador para boton
    const [valor, setValor] = useState(valorInicial)
    return (

        <>
            <div>
                <h3>{titulo}</h3>
                <p>has pulsado {valor} {valor*2} veces</p>
                <button onClick={() => setValor(valor - step)} >-{step}</button>
                <button onClick={() => setValor(valorInicial)} >reiniciar</button>
                <button onClick={() => setValor(((valor + step) >= max) ? max : (valor + step))} >+{step}</button>
                {valor == 9000 ? (<img src="https://static3.srcdn.com/wordpress/wp-content/uploads/2019/06/Vegeta-Its-Over-9000-Dragon-Ball-Z.jpg "></img>) : null}

            </div>
        </>
    )
}

export default Contador