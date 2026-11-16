const express = require('express')
const app = express()

const routerProgramacion =express.Router()
app.use('/api/cursos/programacion', routerProgramacion)



routerProgramacion.get('/',(req,res)=>{
    res.send(JSON.stringify(infoCursos.programacion))
})


routerProgramacion.get('/:lenguaje',(req,res)=>{
    const lenguaje = req.params.lenguaje
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje ===lenguaje)
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+lenguaje)
    }
    //ordena de menor a mayor
     if(req.query.ordenar ==='vistas'){
        return res.send(JSON.stringify(resultados.sort((a,b)=>a.vistas - b.vistas  )))
    }
    res.send(JSON.stringify(resultados))
})
routerProgramacion.get('/:lenguaje/:nivel',(req,res)=>{
    const lenguaje = req.params.lenguaje
    const nivel = req.params.nivel
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje ===lenguaje && curso.nivel===nivel)
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+lenguaje)
    }
   //ordenar mayor a menos 
    if(req.query.ordenar ==='vistas'){
        return res.send(JSON.stringify(resultados.sort((a,b)=> b.vistas - a.vistas)))
    }
     res.send(JSON.stringify(resultados))
   
})