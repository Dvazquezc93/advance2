import { describe, expect, it } from "vitest";
import Producto from "./Producto";
import { render, screen } from "@testing-library/react";

describe('Producto',()=>{
    it('muestra el nombre como encabezado',()=>{
    render(<Producto nombre="Camiseta" precio={19.9} stock={10}/>)
    expect(screen.getByRole('heading',{name:'Camiseta'})).toBeInTheDocument()
})
    it('muestra el precio en euros',()=>{
        render(<Producto nombre="Camiseta" precio={19.9} stock={10}/> )
        expect(screen.getByText('19,90 €')).toBeInTheDocument()
    })
    it('indica que esta agotado y que no está disponible',()=>{
        render(<Producto nombre="Pantalón" precio={45} stock={0}/>)
        expect(screen.getByText('Agotado')).toBeInTheDocument()
        expect(screen.queryByText('Disponible')).not.toBeInTheDocument()
    })
})