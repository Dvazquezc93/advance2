function mostrarTema(tema){
    console.log(`Estoy aprendiendo ${tema}`);
}
/*function sumar(a,b){
    console.log(`La suma de ${a} + ${b} es igual a ${a+b}`);
}*/
/*function saludo(nombre, edad){
    console.log(`Hola ${nombre} tienes ${edad} años`)
}*/
//mostrarTema('Node.js');
//setTimeout(mostrarTema,3000,'Node.js');
//setTimeout(sumar, 3000,18,20);
//setTimeout(saludo, 3000,'Daniel',33);

/*console.log('Antes de setImmediate');
setImmediate(mostrarTema,'Node.js');
console.log('Despues de setImmediate');*/

setInterval(mostrarTema,1500,'Node.js');