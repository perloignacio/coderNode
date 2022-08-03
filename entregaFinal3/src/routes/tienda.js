const express = require('express');
const auth=require('../middlewares/auth')
const router = express.Router();
const tiendaController=require("../controllers/tienda")
let tc=new tiendaController();


router.get("/",auth.checkSession,tc.Home);
router.get("/carrito",auth.checkSession,tc.Carrito);
router.get("/gracias",auth.checkSession,(req,res)=>{
	res.render('pages/gracias');
})

module.exports = router;