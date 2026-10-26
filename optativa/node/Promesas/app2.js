const { rejects } = require("node:assert");
const { resolve } = require("node:dns");

const estatusPedido= ()=> {
    const estatus=Math.random()<0.8;
    return estatus;
}

/*for(let i=0; i<10;i++){
    console.log(estatusPedido());
}*/
const miPedidoDePizza =new Promise((resolve, reject)=>
{setTimeout(()=>{
    if (estatusPedido()){
        resolve('!Pedido realizado con éxito¡ Su pizza está en camino.');
    }else{
        reject('Ocurrió un error. Por favor intente nuevamente.');
    }
},3000)
});

const manejarPedido =(mensajeDeConfirmacion) =>{
    console.log(mensajeDeConfirmacion);
}
const rechazarPedido=(mensajeDeRechazo)=>{
    console.log(mensajeDeRechazo)
}

miPedidoDePizza.then(manejarPedido,rechazarPedido);