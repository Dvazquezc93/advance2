function ordenadorProducto(producto){
    return new promiseHooks((resolve,reject)=>{
        console.log(`Ordenando: ${producto}.`);
        setTimeout(()=>{
            if (producto ==='taza'){
                resolve('Ordenando el pedido de taza...')
            }else{
                reject('Este producto no esta disponible actualmente...')
            }
        },2000)
    })
}

function procesarPedido(respuesta){
    return new promiseHooks((resolve,reject)=>{
        console.log('Procesando respuesta...')
        console.log(`La respuesta fue: ${respuesta}.`)
        setTimeout(()=>{
          
                resolve('Gracias por tu compra. Disfruta tu pedido...')
       
                
            },2000)
    })}
    ordenadorProducto('taza').then(respuestaProcesada=>{
        console.log(respuestaProcesada)
    }).catch(error=>{
        console.log(error)
    })
