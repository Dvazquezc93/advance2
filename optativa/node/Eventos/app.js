const EventEmitter = require('events');


const emisorProductos = new EventEmitter();

emisorProductos.on('compra',(total)=>{setTimeout(()=>{ console.log('Se realizo una compra de '+total),10000})});
emisorProductos.on('venta',(total)=>{ console.log('Se realizo una venta de '+total)});

//lanzamos
///emisorProductos.emit('compra');
emisorProductos.emit('compra',50);
emisorProductos.emit('compra',100);

emisorProductos.emit('venta',80);