import { queryByText, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Libro from "./Libro";

describe('Libro',()=>{

    it('muestra el título como encabezado y el autor con la forma «de Cervantes»',()=>{
        render(<Libro titulo="Don quijote de la mancha" autor="Cervantes" ejemplares={1}/>)
        expect(screen.getByRole('heading',{name:'Don quijote de la mancha'})).toBeInTheDocument()
        expect(screen.getByText('de Cervantes')).toBeInTheDocument()
   
    })
    it('Si hay varios ejemplares, dice cuantos hay',()=>{
        render(<Libro titulo="Don quijote de la mancha" autor="Cervantes" ejemplares={2}/>)
        expect(screen.getByText(/Disponible ()/)).toBeInTheDocument()
        expect(screen.queryByText('No disponible')).not.toBeInTheDocument()
        
    })
    it('si queda un solo ejemplar, avisa de que es el último',()=>{
       render(<Libro titulo="Don quijote de la mancha" autor="Cervantes" ejemplares={1}/>)
       expect(screen.getByText('Último ejemplar')).toBeInTheDocument()
       expect(screen.queryByText(/Disponible ()/)).not.toBeInTheDocument()
    })
    it('si no queda ninguno, dice que no está disponible',()=>{
       render(<Libro titulo="Don quijote de la mancha" autor="Cervantes" ejemplares={0}/>)
       expect(screen.getByText('No disponible')).toBeInTheDocument()
       expect(screen.queryByText('Último ejemplar')).not.toBeInTheDocument()
    })
})
