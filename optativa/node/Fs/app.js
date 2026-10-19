const fs = require('fs');

/*fs.readFile('index.html','utf-8',(err, contenido)=>{
 if (err){
    console.log(err);
 }else{
    console.log(contenido);
 }   
})
console.log('Hola');*/

/*fs.rename('index.html','main.html', (err)=>{
    if (err){
        throw err;
    }
    console.log("Nombre cambiado con exito...");
})*/

/*fs.appendFile('index.html','<p>Línea añadida al final del archivo</p>', (err)=>{
     if (err){
        throw err;
     }
     console.log('Archivo actualizado correctamente...');
})*/

/*fs.writeFile('index.html','Nuevo archivo',(err)=>{
     if (err){
        throw err;
     }
     console.log('Contenido reemplazado con éxito...');
})*/

/*fs.unlink('main.html',(err)=>{
    if (err){
        throw err;
     }
     console.log('Archivo eliminado.');
})*/
//metodo sincrono
console.log("Antes de leer el archivo");
const archivo = fs.readFileSync('index.html','utf-8');
console.log(archivo);
console.log("Después de leer el archivo...");

