const miURL =new URL('https://www.ejemplo.org/cursos/programacion?ordenar=vistas&nivel=1')

console.log('nombre del host: '+ miURL.hostname)

console.log('Ruta o path'+ miURL.pathname)

console.log('Parametros query:'+ miURL.searchParams.get('nivel'))
console.log('Parametros query:'+ miURL.searchParams.get('ordenar'))