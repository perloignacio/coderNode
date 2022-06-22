const express = require('express');

const router = express.Router();
const producto =require('../models/productos');
p=new producto();
router.get('/productos', function (req, res) {
  
    res.json(p.getAll());
})
router.get('/productos/:id', function (req, res) {
    let prod=p.getById(req.params.id);
    if(prod!=undefined){
        res.json(prod);
    }else{
        res.status(404).json({error:"Producto no encontrado"});
    }
    
})
router.post('/productos', function (req, res, next) {
    
    p.save(req.body);
    res.json("Ok");
})
router.put('/productos/:id', function (req, res, next) {
    
    if(p.update(req.params.id,req.body)){
        res.json("Ok");
    }else{
        res.status(404).json({error:"Producto no encontrado"});
    }
    
})

router.delete('/productos/:id', function (req, res, next) {
    
    if(p.deleteById(req.params.id)){
        res.json("Ok");
    }else{
        res.status(404).json({error:"Producto no encontrado"});
    }
    
})

module.exports = router;