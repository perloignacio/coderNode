const express = require('express');
const auth=require('../middlewares/auth')
const router = express.Router();
const usuariosController=require("../controllers/usuarios")
let uc=new usuariosController();
const passport=require("passport");



router.get("/perfil",auth.checkSession,(req,res)=>{
	res.render('pages/register',{userLogged:req.user});
})
router.get("/errorLogin",uc.ErrorLogin)
router.get("/login",(req,res)=>{
	res.render('pages/login');
})
router.get("/registro",(req,res)=>{
	res.render('pages/register');
})
router.post("/login",passport.authenticate("login",{failureRedirect:'/errorLogin'}),async (req,res)=>{
	res.redirect("/")
})

router.get("/salir",(req,res)=>{
	let nombre=req.user.email;
	req.logout(function(err) {
		
		if (err) { return next(err); }
		req.session.destroy();
		res.render("pages/salir",{usuario:nombre})
	});
	
	
})

router.post("/registro",uc.Registro)
router.post("/perfil",uc.Actualiza)

module.exports=router;