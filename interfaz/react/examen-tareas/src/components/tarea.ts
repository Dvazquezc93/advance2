import type { tarea } from "./tipo";
/**
 * cuenta las tareas que no se ha realizado
 * 
 * @param tareas -Lista de tareas
 * @returns cuántos tiene campos tiene false
 */
export function contarPendientes(tareas:tarea[]):number {
    return tareas.filter(t=> !t.hecha).length
}