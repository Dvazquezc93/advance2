export type  prioridad='baja'|'media'|'alta'
export type tarea={
    id:string
    texto:string
    prioridad?:prioridad
    hecha:boolean
}
