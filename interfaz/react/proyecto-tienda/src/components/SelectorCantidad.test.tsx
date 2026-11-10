import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SelectorCantidad from "./SelectorCantidad";
import userEvent from '@testing-library/user-event'

describe('SelectorCantidad',()=>{
    it('empieza en 1 con restar desactivado', () => {
        render(<SelectorCantidad max={3}/>)
        expect(screen.getByText('Cantidad: 1')).toBeInTheDocument()
        expect(screen.getByRole('button',{name:'−'})).toBeDisabled()
    })
    it('suma una unidad al pulsar +', async () => {
        const usuario = userEvent.setup()
        render(<SelectorCantidad max={3}/>)
        await usuario.click(screen.getByRole('button',{name:'+'}))
        expect(screen.getByText('Cantidad: 2')).toBeInTheDocument()
    })
    it('no pasa del maximo y lo avisa', async ()=>{
        const usuario =userEvent.setup()
        render(<SelectorCantidad max={2}/>)
        await usuario.click(screen.getByRole('button', {name:'+'}))
        expect(screen.getByText('Cantidad: 2')).toBeInTheDocument()
        expect(screen.getByRole('button',{name:'+'})).toBeDisabled()
        expect(screen.getByText('No quedan más unidades')).toBeInTheDocument()
})})
