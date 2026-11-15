const express = require('express')
const { infoCursos } = require('./cursos')
const app = express()

app.get('/',(req,res)=>{
    res.send('Mi primer servidor. Cursos')
})
app.get('/api/cursos',(req,res)=>{
    res.send(JSON.stringify(infoCursos))
})
app.get('/api/cursos/programacion',(req,res)=>{
    res.send(JSON.stringify(infoCursos.programacion))
})

app.get('/api/cursos/matematicas',(req,res)=>{
    res.send(JSON.stringify(infoCursos.matematicas))
})
app.get('/api/cursos/programacion/:lenguaje',(req,res)=>{
    const lenguaje = req.params.lenguaje
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje ===lenguaje)
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+lenguaje)
    }
    res.send(JSON.stringify(resultados))
})
app.get('/api/cursos/matematicas/:tema',(req,res)=>{
    const tema = req.params.tema
    const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema)
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+tema)
    }
    res.send(JSON.stringify(resultados))
})

app.get('/api/cursos/programacion/:lenguaje/:nivel',(req,res)=>{
    const lenguaje = req.params.lenguaje
    const nivel = req.params.nivel
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje ===lenguaje && curso.nivel===nivel)
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+lenguaje)
    }
   
    console.log(req.params.ordenar)
     res.send(JSON.stringify(resultados))
   
})

const puerto = process.env.PORT || 3000

app.listen( puerto , ()=>{
    console.log ('El servidor esta escuchando en el puerto '+puerto)
})