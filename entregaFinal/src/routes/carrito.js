const express = require('express');
const router = express.Router();
const carrito =require('../models/carrito');
c=new carrito();
c.iniciar();

const producto =require('../models/productos');
p=new producto();
p.iniciar();

router.get('/carrito/:id/productos', function (req, res) {
    let tmp=c.getById(req.params.id);
    if(tmp!=null){
        resultado=[];
        tmp.productos.forEach(element => {
            console.log(element)
            resultado.push(p.getById(element));
        })
        res.json(resultado);
    }else{
        res.status(404).json({error:"carrito no encontrado"});
    }
})

router.post('/carrito/:id/productos', function (req, res) {

    if(c.AgregarProducto(req.params.id,req.body.id,p._productos)){
        res.json("Ok");
    }else{
        res.status(404).json({error:"Producto no encontrado"});
    }
    
    
})



router.post('/carrito', function (req, res, next) {  
    res.json(c.save());
});

router.put('/carrito/:id', function (req, res, next) {
    
    
    
});


router.delete('/carrito/:id', function (req, res, next) {
    if(c.deleteById(req.params.id)){
        res.json("Ok");
    }else{
        res.status(404).json({error:"Producto no encontrado"});
    }
});

router.delete('/carrito/:id/productos/:id_prod', function (req, res, next) {
    if(c.deleteByIdCarritoIdProd(req.params.id,req.params.id_prod)){
        res.json("Ok");
    }else{
        res.status(404).json({error:"Producto no encontrado"});
    }
});


module.exports = router;