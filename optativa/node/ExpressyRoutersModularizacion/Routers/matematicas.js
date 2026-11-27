// Importa Express para crear un enrutador independiente.
const express = require('express')
//Importamos por desestructuración el json de infoCurs
const {matematicas} = require('../Datos/cursos.js').infoCursos
// Crea el enrutador que agruparía las rutas de matemáticas.
const routerMatematicas =express.Router()



// Ruta raíz del enrutador: intenta responder con todos los cursos de matemáticas.
// En este archivo infoCursos no está importado ni definido.
routerMatematicas.get('/',(req,res)=>{
    res.send(JSON.stringify(matematicas))
})

// Esta segunda ruta raíz también coincide con GET '/', por lo que la primera
// respuesta normalmente impide que se alcance este manejador.
routerMatematicas.get('/:tema',(req,res)=>{
    // Intenta obtener un tema, pero la ruta '/' no declara el parámetro :tema.
    const tema = req.params.tema
    // Filtra el catálogo por tema; infoCursos no está definido en este módulo.
    const resultados = matematicas.filter(curso => curso.tema === tema)
    // Responde con 404 cuando no encuentra cursos para el tema.
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+tema)
    }
    // Devuelve los cursos que coinciden con el tema.
    res.send(JSON.stringify(resultados))
})

// Ruta parametrizada para buscar cursos de matemáticas por tema.
routerMatematicas.get('/:tema/:nivel',(req,res)=>{
    // Lee el tema de la URL.
    const tema = req.params.tema
     const nivel = req.params.nivel
    // Filtra los cursos por el tema solicitado.
    const resultados = matematicas.filter(curso => curso.tema === tema && curso.nivel===nivel)
    // Responde con 404 si no hay cursos para ese tema.
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+tema)
    }
    // Envía los cursos coincidentes al cliente.
    res.send(JSON.stringify(resultados))
})
module.exports =routerMatematicas