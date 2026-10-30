const http =require('http');
const { json } = require('stream/consumers');
 const puerto =3000
//req :solicitud del cliente
// res respuesta del servidor
const servidor= http.createServer((req, res)=>{
    console.log('>>>>>req(Respuesta)')
    res.statusCode=404
    console.log("statuscode: "+res.statusCode)

    res.setHeader('content-type', 'application/json')
    console.log("Cabeceras: ", res.getHeaders())
    res.end('Hola Mundo')
})

servidor.listen(puerto,()=>{
    console.log('El servidor esta escuchando está escuchando en http://localhost:'+puerto+'...')
})
