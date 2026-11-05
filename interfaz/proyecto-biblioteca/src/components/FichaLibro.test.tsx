import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FichaLibro from "./FichaLibro";
describe('FichaLibro',()=>{
    it('muestra el título como encabezado y una línea por género',()=>{
        render(<FichaLibro titulo="El hobbit" generos={['Fantasia']} prestado={false}/>)
        expect(screen.getByRole('heading',{name:'El hobbit'})).toBeInTheDocument()
        expect(screen.getAllByRole('listitem')).toHaveLength(1)
    })
     it('si no hay géneros, lo dice y no pinta ninguna lista',()=>{
        render(<FichaLibro titulo="El hobbit" generos={[]} prestado={false}/>)
        expect(screen.queryAllByRole('listitem')).not.toHaveLength(1)
        expect(screen.getByText('Sin géneros')).toBeInTheDocument()
    })
    it('si el libro no está prestado, se puede reservar y no sale ningún aviso',()=>{
        render(<FichaLibro titulo="El hobbit" generos={[]} prestado={false}/>)
        expect(screen.getByRole('button', {name:'Reservar'})).toBeInTheDocument()
        expect(screen.queryByText('Ahora mismo está prestado')).not.toBeInTheDocument()
    })
     it('si está prestado, el botón de reservar está desactivado y se explica por qué',()=>{
        render(<FichaLibro titulo="El hobbit" generos={[]} prestado={true}/>)
        expect(screen.queryByRole('button', {name:'Reservar'})).toBeDisabled()
        expect(screen.getByText('Ahora mismo está prestado')).toBeInTheDocument()
    })
})