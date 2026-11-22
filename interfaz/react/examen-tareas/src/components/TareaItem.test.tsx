import { describe, expect, it, vi } from "vitest";
import userEvent from '@testing-library/user-event'
import { render, screen } from "@testing-library/react";
import TareaItem from "./TareaItem";

describe('TareaItem',()=>{
    it('al hacer click en el texto de la tarea se llama a la funcion onToggle', async()=>{
        const usuario =userEvent.setup()
        const onToggle = vi.fn()
        render(<TareaItem texto="Hacer la cama" hecha={false} prioridad="media" onToggle={onToggle} ></TareaItem>)
        await usuario.click(screen.getByText("Hacer la cama (media)"))
        expect(onToggle).toHaveBeenCalledTimes(1)
    })
})