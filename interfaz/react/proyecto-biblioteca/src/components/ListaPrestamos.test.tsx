import { describe, expect, it, vi } from "vitest";
import ListaPrestamos from "./ListaPrestamos";
import { render, screen } from "@testing-library/react";



describe('ListaPrestamos',()=>{
    it('mientras espera muestra «Cargando préstamos…» y después la lista, con una línea por préstamo, pidiendo la dirección correct', async()=>{
        const fetchSimulado =vi.
        spyOn(globalThis,'fetch').mockResolvedValue(Response.json([{id:1,libro:"La comunidad del anillo",devolucion:"Martes"},
            {id:2,libro:"El hobbit",devolucion:"Jueves"}
        ]))
        render(<ListaPrestamos/>)
        expect(screen.getByText('Cargando préstamos…')).toBeInTheDocument()
        expect(await screen.findByText('La comunidad del anillo — devolver el Martes' )).toBeInTheDocument()
        expect(screen.getAllByRole('listitem')).toHaveLength(2)
        expect(fetchSimulado).toHaveBeenCalledWith('https://biblioteca.ejemplo.es/api/prestamos')
    })
    it('si no hay ningún préstamo, lo dice y no pinta ninguna lista',async()=>{
        const fetchSimulado = vi.
        spyOn(globalThis,'fetch').mockResolvedValue(Response.json([]))
        render(<ListaPrestamos/>)
        expect( await screen.findByText('No tienes préstamos')).toBeInTheDocument()
        expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
    })
    it('si la API responde con un error 500, muestra el mensaje de error y tampoco pinta ninguna lista', async()=>{
        const fetchSimulado= vi.
        spyOn(globalThis,'fetch').mockResolvedValue( new Response(null, {status:500}))
        render(<ListaPrestamos/>)
        expect(await screen.findByText('No se han podido cargar los préstamos: Error 500')).toBeInTheDocument()
        expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
    })
})