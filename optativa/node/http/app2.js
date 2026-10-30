const http =require('http');
const { json } = require('stream/consumers');
 const puerto =3000
//req :solicitud del cliente
// res respuesta del servidor
const servidor= http.createServer((req, res)=>{
    console.log('>>>>>req(solicitud)')
    console.log('ruta: '+req.url)
    console.log('método: '+req.method)

    console.log('Cabeceras: '+JSON.stringify(req.headers))
    console.log('Cabecera host: '+ req.headers['host'])
    res.end('Hola Mundo')
})

servidor.listen(puerto,()=>{
    console.log('El servidor esta escuchando está escuchando en http://localhost:'+puerto+'...')
})
