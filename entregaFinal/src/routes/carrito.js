



 function carritoRoute(icarrito,iproducto){
    const express = require('express');
    const router = express.Router();

    icarrito.iniciar();
    iproducto.iniciar();

    router.get('/carrito/:id/productos', async function (req, res) {
        let tmp=await icarrito.getById(req.params.id);
        if(tmp!=null){
            let resultado=[]
            for(const idprod of tmp.productos){
                const prod=await iproducto.getById(idprod);
                resultado.push(prod);    
            }
            res.json(resultado);
        }else{
            res.status(404).json({error:"carrito no encontrado"});
        }
    })
    
    router.post('/carrito/:id/productos', async function (req, res) {
        let resultado=await icarrito.AgregarProducto(req.params.id,req.body.id);
        if(resultado){
            res.json("Ok");
        }else{
            res.status(404).json({error:"Producto no encontrado"});
        }
        
        
    })
    
    
    
    router.post('/carrito', async function (req, res, next) {  
        res.json(await icarrito.saveCarrito());
    });
    
    router.put('/carrito/:id', async function (req, res, next) {
        
        
        
    });
    
    
    router.delete('/carrito/:id', async function (req, res, next) {
        let resultado=await icarrito.deleteById(req.params.id);
        if(resultado){
            res.json("Ok");
        }else{
            res.status(404).json({error:"Producto no encontrado"});
        }
    });
    
    router.delete('/carrito/:id/productos/:id_prod', async function (req, res, next) {
        let resultado=await icarrito.deleteByIdCarritoIdProd(req.params.id,req.params.id_prod)
        if(resultado){
            res.json("Ok");
        }else{
            res.status(404).json({error:"Producto no encontrado"});
        }
    });

    return router;
}



module.exports = carritoRoute;