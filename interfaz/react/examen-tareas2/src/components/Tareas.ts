import type { Tarea } from "./tipo";
/**
 * cuenta las tareas pendientes
 * 
 * @param tareas -lista de tareas
 * @returns devuelve el numero de tareas pendientes
 */
export function contarPendientes(tareas:Tarea[]):number{
return tareas.filter((e)=>e.hecha).length
}