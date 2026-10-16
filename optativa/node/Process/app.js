//muestra informacion del objeto 
//console.log(process);

//muestra informacion del entorno:
//console.log(process.env)

/*console.log(process.argv);
nombre=process.argv[2];
apellido=process.argv[3];
function concatena(nombre, apellido){
     console.log("Tu nombre :"+nombre+", tu apellido: "+apellido);
}
concatena(nombre, apellido);*/

/*console.log('Lista de argumentos: ');

for(let i=2;i< process.argv.length;i++)
{
     console.log('argumento '+(i-1)+" = "+process.argv[i]);
}*/

console.log(process.memoryUsage())
