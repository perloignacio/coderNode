const express = require('express');
const app = express();
const path=require("path");

const productRoutes=require('./src/routes/productos');
const carritoRoutes=require('./src/routes/carrito');
app.use(express.urlencoded({extended:true}));



app.use('/api/', productRoutes);
app.use('/api/', carritoRoutes);

app.use(express.json);

server=app.listen(8080,()=>{
    console.log("escuchando");
})

