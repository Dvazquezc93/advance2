import type { tarea } from "../tipos";
export function contarTareasPendientes(tareas :tarea[]): number{
return tareas.filter((t)=>!t.hecha).length
}