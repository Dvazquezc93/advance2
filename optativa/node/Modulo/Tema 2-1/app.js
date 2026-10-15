//creamos objeto saludo que importa el módulo saludo.js
//const saludo = require("./saludos.js");

//constante desestructurada
const {saludar, saludarHolaMundo}= require("./saludos.js")

 console.log(saludar("Auron"));

 console.log(saludarHolaMundo());