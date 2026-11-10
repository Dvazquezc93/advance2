import { describe, expect, it } from "vitest"
import SelectorDias from "./SelectorDias"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";


describe('SelectorDias', ()=>{
    it('empieza en 7 días',()=>{
        render(<SelectorDias/>)
        expect(screen.getByText('Días: 7')).toBeInTheDocument()
        expect(screen.queryByText('Préstamo máximo: 14 días')).not.toBeInTheDocument()
    })
     it('el botón de más suma un día y el de menos resta un día', async()=>{
        const usuario = userEvent.setup()
        render(<SelectorDias/>)
         await usuario.click(screen.getByRole('button',{name:'Más días'}))
         expect(screen.getByText('Días: 8')).toBeInTheDocument()
          expect(screen.queryByText('Días: 7')).not.toBeInTheDocument()
          await usuario.click(screen.getByRole('button',{name:'Menos días'}))
         expect(screen.getByText('Días: 7')).toBeInTheDocument()
         expect(screen.queryByText('Días: 8')).not.toBeInTheDocument()
     
    })
    it('nunca baja de 1 día, y entonces el botón de menos queda desactivado', async()=>{
        const usuario = userEvent.setup()
        render(<SelectorDias/>)
        for (let index = 0; index < 9; index++) {
          await usuario.click(screen.getByRole('button',{name:'Menos días'}))
            
        }
        expect(screen.queryByText('Días: 7')).not.toBeInTheDocument()
        expect(screen.getByText('Días: 1')).toBeInTheDocument()
        expect(screen.getByRole('button', {name:'Menos días'})).toBeDisabled()
       
    })
    it('no pasa del máximo (por defecto 14, pero se puede cambiar) y, al llegar, lo avisa y desactiva el botón de más', async()=>{
       const usuario = userEvent.setup()
        render(<SelectorDias/>)
        for (let index = 0; index < 9; index++) {
           await usuario.click(screen.getByRole('button',{name:'Más días'}))
            
        }
        expect(screen.getByText('Préstamo máximo: 14 días')).toBeInTheDocument()
        expect(screen.getByRole('button',{name:'Más días'})).toBeDisabled()
        expect(screen.queryByText('Días: 7')).not.toBeInTheDocument()
       
    })

})
