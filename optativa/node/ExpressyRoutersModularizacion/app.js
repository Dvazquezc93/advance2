// Importa Express para crear la aplicación y sus enrutadores.
const express = require('express')
// Importa los datos de cursos usados por las rutas definidas en este archivo.
const { infoCursos } = require('./cursos')
// Crea la aplicación principal del servidor.
const app = express()
// Crea el enrutador que agrupará las rutas de programación.
const routerProgramacion =express.Router()
// Monta las rutas de programación bajo el prefijo indicado.
app.use('/api/cursos/programacion', routerProgramacion)

// Crea el enrutador que agrupará las rutas de matemáticas.
const routerMatematicas =express.Router()
// Monta las rutas de matemáticas bajo el prefijo indicado.
app.use('/api/cursos/matematicas', routerMatematicas)

// Ruta inicial: responde con un mensaje de bienvenida.
app.get('/',(req,res)=>{
    res.send('Mi primer servidor. Cursos')
})
// Devuelve todos los cursos de todas las categorías.
app.get('/api/cursos',(req,res)=>{
    res.send(JSON.stringify(infoCursos))
})
// Al estar montada bajo /api/cursos/programacion, esta ruta raíz devuelve
// la lista completa de cursos de programación.
routerProgramacion.get('/',(req,res)=>{
    res.send(JSON.stringify(infoCursos.programacion))
})

// Al estar montada bajo /api/cursos/matematicas, esta ruta raíz devuelve
// la lista completa de cursos de matemáticas.
routerMatematicas.get('/',(req,res)=>{
    res.send(JSON.stringify(infoCursos.matematicas))
})
// Busca cursos de programación por el lenguaje indicado en la URL.
routerProgramacion.get('/:lenguaje',(req,res)=>{
    // Lee el parámetro dinámico :lenguaje.
    const lenguaje = req.params.lenguaje
    // Conserva únicamente los cursos de ese lenguaje.
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje ===lenguaje)
    // Si no hay resultados, responde con el estado HTTP 404.
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+lenguaje)
    }
    // Si se solicita ordenar por vistas, los organiza de menor a mayor.
     if(req.query.ordenar ==='vistas'){
        return res.send(JSON.stringify(resultados.sort((a,b)=>a.vistas - b.vistas  )))
    }
    // Devuelve los resultados sin ordenar si no se indicó el criterio.
    res.send(JSON.stringify(resultados))
})
// Este manejador también está registrado en la ruta raíz de matemáticas.
// En Express, el manejador anterior para GET '/' ya responde a esa ruta,
// por lo que este código no funciona como búsqueda por tema.
routerMatematicas.get('/',(req,res)=>{
    // Se intenta leer un parámetro de ruta, aunque '/' no define :tema.
    const tema = req.params.tema
    // Filtra los cursos de matemáticas por tema.
    const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema)
    // Si no hay coincidencias, responde con un error 404.
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+tema)
    }
    // Devuelve los cursos coincidentes.
    res.send(JSON.stringify(resultados))
})

// Busca cursos de programación por lenguaje y nivel.
routerProgramacion.get('/:lenguaje/:nivel',(req,res)=>{
    // Obtiene los dos parámetros de la URL.
    const lenguaje = req.params.lenguaje
    const nivel = req.params.nivel
    // Filtra por lenguaje y nivel simultáneamente.
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje ===lenguaje && curso.nivel===nivel)
    // Si no hay coincidencias, responde con un error 404.
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+lenguaje)
    }
   // Si se solicita ordenar por vistas, lo hace de mayor a menor.
    if(req.query.ordenar ==='vistas'){
        return res.send(JSON.stringify(resultados.sort((a,b)=> b.vistas - a.vistas)))
    }
     // Si no se indicó orden, devuelve los cursos filtrados como están.
     res.send(JSON.stringify(resultados))
   
})

// Selecciona el puerto del entorno o, en su defecto, el puerto 3000.
const puerto = process.env.PORT || 3000

// Arranca el servidor y registra en consola el puerto utilizado.
app.listen( puerto , ()=>{
    console.log ('El servidor esta escuchando en el puerto '+puerto)
})