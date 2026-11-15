export type Prioridad ='alta'|'media'|'baja'
export type Tarea={
    id:string
    texto:string
    prioridad:Prioridad
    hecha:boolean
}
export type NuevaTarea = Omit<Tarea,'id'>