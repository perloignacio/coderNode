const express = require('express');

const app = express();
const path=require("path");

const productRoutes=require('./src/routes/productos');
const carritoRoutes=require('./src/routes/carrito');
app.use(express.urlencoded({extended:true}));

let pathC="";
let pathP="";
require('dotenv').config() 
console.log(process.env.CONTAINER);
switch (process.env.CONTAINER) {
    case 'firebase':
        pathC= "./src/DAOs/carritoFirebase"
        pathP="./src/DAOs/ProductosFirebase"
        break;
    case 'mongo':
        pathC= "./src/DAOs/carritoMongo"
        pathP="./src/DAOs/ProductosMongo"
        break;
    case 'memory':
       pathC= "./src/DAOs/carritoMemory"
       pathP="./src/DAOs/ProductosMemory"
       break;
    case 'file':
        pathC= "./src/DAOs/carritoFile"
        pathP="./src/DAOs/ProductosFile"
        break;
}
console.log(pathC)
const carrito =require(pathC);
const producto =require(pathP);
c=new carrito();
//c.iniciar();

p=new producto();
//p.iniciar();

app.use('/api/', productRoutes(p));
app.use('/api/', carritoRoutes(c,p));

app.use(express.json);

server=app.listen(8080,()=>{
    console.log("escuchando");
})

