import { render, screen } from "@testing-library/react";
import FichaProducto from "./FichaProducto";
import { describe, expect, it } from "vitest";


describe('FichaProducto',()=>{
    it('muestra el nombre y una linea por caracteristica',()=>{
        render(<FichaProducto nombre="Mochila" caracteristicas={['Impermeable','20 litros']}/>)
        expect(screen.getByRole('heading',{name:'Mochila'}))
        expect(screen.getAllByRole('listitem')).toHaveLength(2)
        expect(screen.getByText('Impermeable')).toBeInTheDocument()
    })
    it('avisa si no hay caracteristicas',()=>{
        render(<FichaProducto nombre="Mochila" caracteristicas={[]}/>)
        expect(screen.getByText('Sin características')).toBeInTheDocument()
        expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })
    it('tiene el botón añadir al carro',()=>{
        render(<FichaProducto nombre="Mochila"caracteristicas={[]}/>)
        expect(screen.getByRole("button", {name:"Añadir al carrito"})).toBeInTheDocument()
    })
})