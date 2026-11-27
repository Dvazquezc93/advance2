// Importa Express para crear un enrutador independiente.
const express = require('express')

//Importamos por desestructuración el json de infoCursos
const {programacion} = require('../Datos/cursos.js').infoCursos
// Crea el enrutador que agruparía las rutas de programación.
const routerProgramacion=express.Router()


routerProgramacion.use(express.json())

// Ruta raíz del enrutador: intenta responder con todos los cursos de programación.
// En este archivo infoCursos no está importado ni definido.
routerProgramacion.get('/',(req,res)=>{
    res.send(JSON.stringify(programacion))
})


// Busca cursos de programación por el lenguaje indicado en la URL.
routerProgramacion.get('/:lenguaje',(req,res)=>{
    // Lee el parámetro dinámico :lenguaje.
    const lenguaje = req.params.lenguaje
    // Filtra el catálogo para conservar los cursos de ese lenguaje.
    const resultados = programacion.filter(curso => curso.lenguaje ===lenguaje)
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
    // Filtra el catálogo por lenguaje y nivel; 
    const resultados = programacion.filter(curso => curso.lenguaje ===lenguaje && curso.nivel===nivel)
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

routerProgramacion.post('/', (req, res)=>{
    let cursoNuevo =req.body
    programacion.push(cursoNuevo)
    res.send(JSON.stringify(programacion))
})
routerProgramacion.put('/:id', (req, res)=>{
    const cursoActualizado =req.body
    const id= req.params.id
    const indice = programacion.findIndex(curso=> curso.id ===id)
    if (indice>=0) {
        programacion[indice]=cursoActualizado
    }
   
    res.send(JSON.stringify(programacion))
})

module.exports =routerProgramacion