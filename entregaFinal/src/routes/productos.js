


function productosRoute(iproducto){
    const express = require('express');
    const auth=require('../middleware/admin')
    const asyncHandler = require('express-async-handler')
    const router = express.Router();

    iproducto.iniciar();
    router.get('/productos/:id?',async (req, res) => {
        
        let id = req.params.id;
        if (!id) {
            let resultado =await iproducto.getAll();
            res.json(resultado);
        }else{
            let resultado =await iproducto.getById(id)
            res.json(resultado);
        }
       
    })

    router.post('/productos',auth.esAdmin, async (req, res) => {
        let resultado=await iproducto.insert(req.body);
        if(resultado){
            res.json("Ok");
        }else{
            res.json("Error");
        }
        
    });
    
    router.put('/productos/:id',auth.esAdmin, async (req, res) => {
        let resultado=await iproducto.update(req.params.id,req.body);
        if(resultado){
            res.json("Ok");
        }else{
            res.status(404).json({error:"Producto no encontrado"});
        }
        
    });
    
    
    router.delete('/productos/:id', auth.esAdmin,async function (req, res, next) {
        let resultado=await iproducto.deleteById(req.params.id)
        if(resultado){
            res.json("Ok");
        }else{
            res.status(404).json({error:"Producto no encontrado"});
        }
        
    });
    
    return router;
}






module.exports = productosRoute;