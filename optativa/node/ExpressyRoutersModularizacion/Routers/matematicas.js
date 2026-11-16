const express = require('express')
const app = express()

const routerMatematicas =express.Router()
app.use('/api/cursos/matematicas', routerMatematicas)



routerMatematicas.get('/',(req,res)=>{
    res.send(JSON.stringify(infoCursos.matematicas))
})

routerMatematicas.get('/',(req,res)=>{
    const tema = req.params.tema
    const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema)
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+tema)
    }
    res.send(JSON.stringify(resultados))
})

routerMatematicas.get('/:tema',(req,res)=>{
    const tema = req.params.tema
    const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema)
    if(resultados.length===0){
        return res.status(404).send("no se encontraron curso de "+tema)
    }
    res.send(JSON.stringify(resultados))
})