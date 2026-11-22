export type prioridad ='alta'| 'media'|'baja'
export type tarea ={
    id:string
    texto:string
    hecha:boolean
    prioridad:prioridad
}
export type NuevaTarea =Omit<tarea, 'id'>