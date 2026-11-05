import { afterEach, describe, expect, it, vi } from "vitest";
import ListaCategorias from "./ListaCategorias";
import { render, screen } from "@testing-library/react";
describe('ListaCategorias',()=>{
  afterEach(()=>{
    vi.restoreAllMocks()
  })
  it('muestra <<<Cargando>> y despues las categorias', async ()=>{
    const fetchSimulado =vi.
    spyOn(globalThis, 'fetch')
    .mockResolvedValue(Response.json(['electronics','jewelery']))
    render(<ListaCategorias/>)

    
    expect(screen.getByText('Cargando categorías…')).toBeInTheDocument()
    expect(await screen.findByText('electronics')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(fetchSimulado).toHaveBeenCalledWith('https://fakestoreapi.com/products/categories')
  })
  it('muestra el error si la API responde 404', async ()=>{
    vi
    .spyOn(globalThis,'fetch')
    .mockResolvedValue(new Response(null, {status:404}))
    render(<ListaCategorias/>)
    expect(await screen.findByText('No se han podido cargar las categorías: Error 404')).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })
})