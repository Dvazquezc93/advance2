console.log('¡Hola Mundo!');

console.warn('¡Ha ocurrido un error!');

console.error(new Error('¡Error crítico!'));

const edad =18;
console.assert(edad>18, "La edad debe ser menor o igual a 18");
const usuarios =[
    {nombre:"Antonio", edad: 25},
    {nombre:"Teresa", edad: 22},
    {nombre:"María", edad: 31}
];
console.table(usuarios);