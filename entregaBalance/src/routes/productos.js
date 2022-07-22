const express = require('express');

const routerProd = express.Router();
routerProd.get("/productos-test",(req,res)=>{
    res.render('lista',{productos:p.getRandom()});
})

module.exports = routerProd;