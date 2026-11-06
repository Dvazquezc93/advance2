const http = require('http')

const cursos = require('./cursos.js')

const puerto = 3000

const servidor = http.createServer((req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            return gestionarSolicitudGET(req, res)
        default:
            console.log('El metodo usado: ' + method + ' no se puede gestionar...node')
    }

})

servidor.listen(puerto, () => {
    console.log('El servidor esta ecuchando está escuchando en http://localhost:' + puerto + '...')
})


function  gestionarSolicitudGET(req, res) {
    const path =req.url
      
        if (path==='/'){
            res.statusCode =200
            return res.end('Bienvenidos a mi primer servidor y API creados con Node.js')

        }else if(path==='/cursos'){
            res.statusCode =200
           return res.end(JSON.stringify(cursos.infoCursos.programacion))
        }else if(path==='/cursos/programacion'){
            res.statusCode =200
            return res.end(JSON.stringify(cursos.infoCursos.programacion))
        } else if(path==='/cursos/matematicas'){
            res.statusCode =200
            return res.end(JSON.stringify(cursos.infoCursos.matematicas))
        }
        res.statusCode=400
        res.end('El recurso solicitado no existe...')
    }

    