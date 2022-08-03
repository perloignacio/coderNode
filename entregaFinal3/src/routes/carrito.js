




    const express = require('express');
    const router = express.Router();
    const carritoController=require("../controllers/carrito")
    let cc=new carritoController();

    router.get('/carrito/:id/productos', cc.ObtenerProductosCarrito)
    
    router.post('/carrito/productos', cc.AgregarProductos)
    router.post('/carrito/vaciar', cc.Vaciar)
    
    
    router.post('/carrito', cc.CrearCarrito);
    router.post('/carrito/quitarProducto', cc.QuitarProducto);

    router.post('/carrito/confirmar', cc.Confirmar);
    
    router.delete('/carrito/:id', cc.BorrarCarrito);
    
    router.delete('/carrito/:id/productos/:id_prod', async function (req, res, next) {
        
    });

    



module.exports = router;