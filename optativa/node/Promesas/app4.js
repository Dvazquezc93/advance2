const { rejects } = require("node:assert");
const console = require("node:console");
const { resolve } = require("node:dns");

const estatusPedido= ()=> {
    const estatus=Math.random()<0.8;
    return estatus;
}


const miPedidoDePizza =new Promise((resolve, reject)=>
{setTimeout(()=>{
    if (estatusPedido()){
        resolve('!Pedido realizado con éxito¡ Su pizza está en camino.');
    }else{
        reject('Ocurrió un error. Por favor intente nuevamente.');
    }
},3000)
});
miPedidoDePizza.then((mensajeDeConfirmacion)=>{
    console.log(mensajeDeConfirmacion)
}).catch((mensajeDeRechazo)=>{
    console.log(mensajeDeRechazo)
})