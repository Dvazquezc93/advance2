const express = require('express')
const { infoCursos } = require('./cursos')
const app = express()
const routerProgramacion =express.Router()
app.use('/api/cursos/programacion', routerProgramacion)

const routerMatematicas =express.Router()
app.use('/api/cursos/matematicas', routerMatematicas)

app.get('/',(req,res)=>{
    res.send('Mi primer servidor. Cursos')
})
app.get('/api/cursos',(req,res)=>{
    res.send(JSON.stringify(infoCursos))
})
routerProgramacion.get('/',(req,res)=>{
    res.send(JSON.stringify(infoCursos.programacion))
})

routerMatematicas.get('/',(req,res)=>{
    res.send(JSON.stringify(infoCursos.matematicas))
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
routerMatematicas.get('/',(req,res)=>{
    const tema = req.params.tema
    const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema)
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+tema)
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

const puerto = process.env.PORT || 3000

app.listen( puerto , ()=>{
    console.log ('El servidor esta escuchando en el puerto '+puerto)
})