
const express = require('express');
const auth=require('../middlewares/admin')
const router = express.Router();
const productosController=require("../controllers/productos")
let pc=new productosController();

router.get('/productos/:id?',pc.ObtenerTodos)
router.post('/productos',auth.esAdmin, pc.AgregarProducto);
router.put('/productos/:id',auth.esAdmin, pc.ModificarProducto);
router.delete('/productos/:id', auth.esAdmin,pc.BorrarProducto);

module.exports = router;