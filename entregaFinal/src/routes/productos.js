const express = require('express');
const auth=require('../middleware/admin')
const router = express.Router();
const producto =require('../models/productos');
p=new producto();
p.iniciar();


router.get('/productos/:id?', function (req, res) {
    let id = req.params.id;
    if (!id) {
        res.json(p.getAll());
    }else{
        res.json(p.getById(id));
    }
   
})



router.post('/productos',auth.esAdmin, function (req, res, next) {  
    p.save(req.body);
    res.json("Ok");
});

router.put('/productos/:id',auth.esAdmin, function (req, res, next) {
    
    if(p.update(req.params.id,req.body)){
        res.json("Ok");
    }else{
        res.status(404).json({error:"Producto no encontrado"});
    }
    
});


router.delete('/productos/:id', auth.esAdmin,function (req, res, next) {
    
    if(p.deleteById(req.params.id)){
        res.json("Ok");
    }else{
        res.status(404).json({error:"Producto no encontrado"});
    }
    
});


module.exports = router;