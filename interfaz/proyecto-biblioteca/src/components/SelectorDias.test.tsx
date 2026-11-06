import { describe, expect, it } from "vitest"
import SelectorDias from "./SelectorDias"
import { render, screen } from "@testing-library/react"

describe('SelectorDias', ()=>{
    it('empieza en 7 días',()=>{
        render(<SelectorDias/>)
        expect(screen.getByText('Días: 7')).toBeInTheDocument()
        expect(screen.queryByText('Préstamo máximo: 14 días')).not.toBeInTheDocument()
    })
     it('el botón de más suma un día y el de menos resta un día', async()=>{
        render(<SelectorDias/>)
        expect(screen.getByText('Días: 7')).toBeInTheDocument()
        expect(screen.queryByText('Préstamo máximo: 14 días')).not.toBeInTheDocument()
    })
    
})