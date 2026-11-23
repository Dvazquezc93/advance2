// Importa Express para crear un enrutador independiente.
const express = require('express')
// Crea una aplicación Express; este objeto no se utiliza en el resto del archivo.
const app = express()

// Crea el enrutador que agruparía las rutas de programación.
const routerProgramacion =express.Router()
// Monta el enrutador en una aplicación local. Para que afecte al servidor
// principal, este módulo tendría que exportar el enrutador e importarse allí.
app.use('/api/cursos/programacion', routerProgramacion)


// Ruta raíz del enrutador: intenta responder con todos los cursos de programación.
// En este archivo infoCursos no está importado ni definido.
routerProgramacion.get('/',(req,res)=>{
    res.send(JSON.stringify(infoCursos.programacion))
})


// Busca cursos de programación por el lenguaje indicado en la URL.
routerProgramacion.get('/:lenguaje',(req,res)=>{
    // Lee el parámetro dinámico :lenguaje.
    const lenguaje = req.params.lenguaje
    // Filtra el catálogo para conservar los cursos de ese lenguaje.
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje ===lenguaje)
    // Responde con 404 cuando no hay coincidencias.
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+lenguaje)
    }
    // Si se solicita ordenar por vistas, lo hace de menor a mayor.
     if(req.query.ordenar ==='vistas'){
        return res.send(JSON.stringify(resultados.sort((a,b)=>a.vistas - b.vistas  )))
    }
    // Devuelve los resultados sin ordenar si no se indicó un criterio.
    res.send(JSON.stringify(resultados))
})
// Busca cursos que coincidan con el lenguaje y el nivel indicados.
routerProgramacion.get('/:lenguaje/:nivel',(req,res)=>{
    // Lee ambos parámetros de la URL.
    const lenguaje = req.params.lenguaje
    const nivel = req.params.nivel
    // Filtra el catálogo por lenguaje y nivel; infoCursos no está definido aquí.
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje ===lenguaje && curso.nivel===nivel)
    // Responde con 404 cuando no encuentra cursos para ese lenguaje.
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+lenguaje)
    }
   // Si se solicita ordenar por vistas, lo hace de mayor a menor.
    if(req.query.ordenar ==='vistas'){
        return res.send(JSON.stringify(resultados.sort((a,b)=> b.vistas - a.vistas)))
    }
     // Devuelve los resultados sin ordenar si no se indicó un criterio.
     res.send(JSON.stringify(resultados))
   
})