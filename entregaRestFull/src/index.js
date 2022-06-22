


const express = require('express');
const app = express();
const path=require("path");
const productRoutes = require('./routes/productos');

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
app.use('/api/', productRoutes);

app.get('', function (req, res) {
  res.sendFile("index.html");
})






app.use(express.json);

server=app.listen(8080,()=>{
    console.log("escuchando");
})