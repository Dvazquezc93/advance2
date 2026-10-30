const http =require('http');
 const puerto =3000
//req :solicitud del cliente
// res respuesta del servidor
const servidor= http.createServer((req, res)=>{
    console.log('Solicitud nueva')
    res.end('Hola mundo')
})

servidor.listen(puerto,()=>{
    console.log('El servidor esta ecuchando está escuchando en http://localhost:'+puerto+'...')
})
