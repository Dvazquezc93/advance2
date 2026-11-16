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


const puerto = process.env.PORT || 3000

app.listen( puerto , ()=>{
    console.log ('El servidor esta escuchando en el puerto '+puerto)
})