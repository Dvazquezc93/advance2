import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FormularioReserva from "./FormularioReserva";
import userEvent from "@testing-library/user-event";
describe('FormularioReserva',()=>{
    it('con datos correctos, llama a onReservar una sola vez con el nombre y el correo sin espacios sobrantes, y vacía los campos',async()=>{
        const  usuario =userEvent.setup()
        const onReservar =vi.fn()
        render(<FormularioReserva onReservar={onReservar}/>)
        await usuario.type(screen.getByLabelText('Nombre del socio'),' PEPE ')
        await usuario.type(screen.getByLabelText('Correo'),' jose@ejemplo.com ')
        await usuario.click(screen.getByRole('button',{name:'Reservar libro'}))
        expect(onReservar).toHaveBeenCalledWith({socio:'PEPE',correo:'jose@ejemplo.com'})
        expect(screen.getByLabelText('Nombre del socio')).toHaveValue('')
         expect(screen.getByLabelText('Correo')).toHaveValue('')
        })
        it('si falta el nombre, no llama a onReservar y avisa',async()=>{
         const  usuario =userEvent.setup()
        const onReservar =vi.fn()
        render(<FormularioReserva onReservar={onReservar}/>)
        await usuario.type(screen.getByLabelText('Correo'),' jose@ejemplo.com ')   
        await usuario.click(screen.getByRole('button',{name:'Reservar libro'}))
        expect(onReservar).not.toHaveBeenCalled()
        expect(screen.getByText('Escribe tu nombre')).toBeInTheDocument()
            
        })
         it('si el correo no tiene @, no llama a onReservar y avisa.',async()=>{
         const  usuario =userEvent.setup()
        const onReservar =vi.fn()
        render(<FormularioReserva onReservar={onReservar}/>)
         await usuario.type(screen.getByLabelText('Nombre del socio'),' PEPE ')
        await usuario.type(screen.getByLabelText('Correo'),' joseejemplo.com ')   
        await usuario.click(screen.getByRole('button',{name:'Reservar libro'}))
        expect(onReservar).not.toHaveBeenCalled()
        expect(screen.getByText('El correo no es válido')).toBeInTheDocument()
            
        })
})