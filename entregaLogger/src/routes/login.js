const express = require('express');
const auth=require("../middleware/session");
const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const router = express.Router();
const pino=require("pino");
const loggerError = pino(pino.destination('./eror.log'))
loggerError.level="error";

passport.use("login",new LocalStrategy(
	(username,password,done)=>{
		
		user.login({email:username,contra:password}).then((u)=>{
			console.log(u);
			if(!u.ok){
				return done(null,false);	
			}else{
				return done(null,u.data)
			}
		})
	}
));
passport.serializeUser((user,done)=>{
	
	done(null,user._id)
})
passport.deserializeUser((id,done)=>{
	
	user.getById(id).then((u)=>{
		done(null,u);
	})
});	
router.get("/",auth.checkSession,(req,res)=>{
	
	res.render('main',{usuario:req.user.email});
})
router.get("/errorLogin",(req,res)=>{
	loggerError.error({method:req.method,url:req.originalUrl,msj:'usuario / contraseña incorrectas'})
	res.render('error',{result:'usuario / contraseña incorrectas',url:'login'});
})
router.get("/login",(req,res)=>{
	res.render('login');
})
router.get("/registro",(req,res)=>{
	res.render('register');
})
router.post("/login",passport.authenticate("login",{failureRedirect:'/errorLogin'}),async (req,res)=>{
	res.redirect("/")
})

router.post("/registro",async (req,res)=>{
	
	let ret=await user.guardar(req.body);
	if(!ret.ok){
		ret.url="registro";
		loggerError.error({method:req.method,url:req.originalUrl,msj:ret})
		res.render('error',ret);
	}else{
		res.redirect("/login")
	}
	
})
router.post("/salir",(req,res)=>{
	let nombre=req.user.email;
	req.logout(function(err) {
		
		if (err) { return next(err); }
		req.session.destroy();
		res.render("salir",{usuario:nombre})
	});
	
	
})

module.exports = router;