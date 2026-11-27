// Importa Express para crear la aplicación.
const express = require('express')
// Importa los datos de cursos usados por las rutas definidas en este archivo.
const { infoCursos } = require('./Datos/cursos')
// Crea la aplicación principal del servidor.
const app = express()

//routers
const routerMatematicas = require('./Routers/matematicas.js')
app.use("/api/cursos/matematicas", routerMatematicas)
const routerProgramacion = require('./Routers/programacion.js')
app.use("/api/cursos/programacion", routerProgramacion)
// Ruta inicial: responde con un mensaje de bienvenida.
app.get('/',(req,res)=>{
    res.send('Mi primer servidor. Cursos')
})
// Devuelve todos los cursos de todas las categorías.
app.get('/api/cursos',(req,res)=>{
    res.send(JSON.stringify(infoCursos))
})

// Selecciona el puerto del entorno o, en su defecto, el puerto 3000.
const puerto = process.env.PORT || 3000

// Arranca el servidor y registra en consola el puerto utilizado.
app.listen( puerto , ()=>{
    console.log ('El servidor esta escuchando en el puerto '+puerto)
})
