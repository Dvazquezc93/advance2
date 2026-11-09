const http = require('http')

const cursos = require('./cursos.js')

const puerto = 3000

const servidor = http.createServer((req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            return gestionarSolicitudGET(req, res)
        case 'POST':
            return gestionarSolicitudPOST(req, res)
        case 'PUT':
            return gestionarSolicitudPUT(req, res)
        case 'DELETE':
            return gestionarSolicitudDELETE(req, res)
        default:
            res.statusCode =501
            console.log('El metodo usado: ' + method + ' no se puede gestionar...')
    }

})

servidor.listen(puerto, () => {
    console.log('El servidor esta ecuchando está escuchando en http://localhost:' + puerto + '...')
})


function  gestionarSolicitudGET(req, res) {
    const path =req.url
      
        if (path==='/'){
            res.writeHead(200,{'Content-Type':'application/json'})
            res.statusCode =200
            return res.end('Bienvenidos a mi primer servidor y API creados con Node.js')

        }else if(path==='/api/cursos'){
            res.statusCode =200
           return res.end(JSON.stringify(cursos.infoCursos))
        }else if(path==='/api/cursos/programacion'){
            res.statusCode =200
            return res.end(JSON.stringify(cursos.infoCursos.programacion))
        } else if(path==='/api/cursos/matematicas'){
            res.statusCode =200
            return res.end(JSON.stringify(cursos.infoCursos.matematicas))
        }
        res.statusCode=400
        res.end('El recurso solicitado no existe...')
    }
function  gestionarSolicitudPOST(req, res) {
    const path =req.url
    if(path==='/api/cursos'){
        res.statusCode =200
        return res.end('El servido recibió una solicitud POST para /cursos/programacion')
    }
}

function  gestionarSolicitudPUT(req, res) {
    const path =req.url
    if(path==='/api/cursos'){
        res.statusCode =200
        return res.end('El servido recibió una solicitud PUT para /cursos/programacion')
    }
}

function  gestionarSolicitudDELETE(req, res) {
    const path =req.url
    if(path==='/api/cursos'){
        res.statusCode =200
        return res.end('El servido recibió una solicitud DELETE para /cursos/programacion')
    }
}
 
    