export type Contacto ={
    id:string
    nombre:string
    telefono:string
    favorito:boolean
}
export type NuevoContacto =Omit<Contacto,'id'>