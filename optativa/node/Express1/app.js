// Importa Express para crear el servidor y definir sus rutas HTTP.
const express = require('express')
// Importa el conjunto de datos de cursos que utilizarán las rutas.
const { infoCursos } = require('./cursos')
// Crea la aplicación principal de Express.
const app = express()

// Ruta inicial: responde con un mensaje de bienvenida.
app.get('/',(req,res)=>{
    res.send('Mi primer servidor. Cursos')
})
// Devuelve todos los cursos de todas las categorías.
app.get('/api/cursos',(req,res)=>{
    res.send(JSON.stringify(infoCursos))
})
// Devuelve la lista completa de cursos de programación.
app.get('/api/cursos/programacion',(req,res)=>{
    res.send(JSON.stringify(infoCursos.programacion))
})

// Devuelve la lista completa de cursos de matemáticas.
app.get('/api/cursos/matematicas',(req,res)=>{
    res.send(JSON.stringify(infoCursos.matematicas))
})
// Busca cursos de programación cuyo lenguaje coincida con el parámetro de la URL.
app.get('/api/cursos/programacion/:lenguaje',(req,res)=>{
    // Lee el valor dinámico :lenguaje de la ruta.
    const lenguaje = req.params.lenguaje
    // Filtra los cursos para conservar solo los del lenguaje solicitado.
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje ===lenguaje)
    // Si no hay coincidencias, responde con el estado HTTP 404.
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+lenguaje)
    }
    // Si se solicita ordenar por vistas, los organiza de menor a mayor.
     if(req.query.ordenar ==='vistas'){
        return res.send(JSON.stringify(resultados.sort((a,b)=>a.vistas - b.vistas  )))
    }
    // Si no se pidió ordenar, devuelve los resultados en su orden original.
    res.send(JSON.stringify(resultados))
})
// Busca cursos de matemáticas cuyo tema coincida con el parámetro de la URL.
app.get('/api/cursos/matematicas/:tema',(req,res)=>{
    // Lee el tema solicitado en la ruta.
    const tema = req.params.tema
    // Filtra los cursos por el tema indicado.
    const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema)
    // Informa que no se encontraron cursos con ese tema.
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+tema)
    }
    // Devuelve los cursos que coinciden con el tema.
    res.send(JSON.stringify(resultados))
})

// Busca cursos que coincidan tanto con el lenguaje como con el nivel.
app.get('/api/cursos/programacion/:lenguaje/:nivel',(req,res)=>{
    // Obtiene el lenguaje y el nivel de los segmentos de la URL.
    const lenguaje = req.params.lenguaje
    const nivel = req.params.nivel
    // Conserva los cursos que cumplen ambas condiciones.
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje ===lenguaje && curso.nivel===nivel)
    // Si no hay coincidencias, responde con un error 404.
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+lenguaje)
    }
   // Si se solicita, ordena los resultados por vistas de mayor a menor.
    if(req.query.ordenar ==='vistas'){
        return res.send(JSON.stringify(resultados.sort((a,b)=> b.vistas - a.vistas)))
    }
     // Devuelve los resultados sin ordenarlos cuando no se solicita ordenar.
     res.send(JSON.stringify(resultados))
   
})

// Usa el puerto definido en el entorno o el 3000 si no se ha configurado.
const puerto = process.env.PORT || 3000

// Inicia el servidor y muestra en consola el puerto en el que escucha.
app.listen( puerto , ()=>{
    console.log ('El servidor esta escuchando en el puerto '+puerto)
})