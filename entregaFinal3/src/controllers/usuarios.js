
const path =require('path');
const logger=require("../helpers/logger");
const log=new logger();
const usuario=require("../models/usuarios");
const user=new usuario();   

const productos=require("../models/productos");
const iproducto=new productos();

const email=require("../helpers/email");
let EnviaMail=new email();

const carrito=require("../models/carrito");
const icarrito=new carrito();

class usuariosController{
    constructor(){

    }

    ErrorLogin = async (req, res) => {
        try {
            res.render('pages/error',{result:'usuario / contraseña incorrectas',url:'login'});
        } catch (error) {
            log.error(error);
            res.status(400).json({error});
        }
    
    }

    Registro = async (req, res) => {
        try {
            if(!req.files) {
                res.render('pages/error',"Ingrese la imagen de perfil");
            }
            const file = req.files.profileImage;
            const filename=Date.now()+path.extname(file.name);
            const filepath = "./src/public/uploads/" +filename ;
            file.mv(filepath, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                
            });

            let newUser = {
                nombre: req.body.nombre,
                contra : req.body.contra,
                email:  req.body.email,
                direccion: req.body.direccion,
                edad: req.body.edad,
                telefono: req.body.telefono,
                profile:filename
            }
            
            let ret=await user.guardar(newUser);
            
            if(!ret.ok){
                
                ret.url="registro";
                res.render('pages/error',ret);
            }else{
                await EnviaMail.enviarAdmin("nuevoRegistro",newUser);
                res.redirect("/login")
            }
            //EnviaMail.enviarAdmin("nuevoRegistro",newUser);
            //res.send("ok");
        } catch (error) {
            log.error(error);
            res.status(400).json({error});
        }
    
    }

    Actualiza = async (req, res) => {
        try {
            let filename=req.user.profile;
            
            if(req.files){
                const file = req.files.profileImage;
                filename=Date.now()+path.extname(file.name);
                const filepath = "./src/public/uploads/" +filename ;
                file.mv(filepath, (err) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    
                });
            }
            let newUser = {
                _id:req.user._id,
                nombre: req.body.nombre,
                contra : req.body.contra!="" ? req.body.contra : "",
                email:  req.body.email,
                direccion: req.body.direccion,
                edad: req.body.edad,
                telefono: req.body.telefono,
                profile:filename
            }
            console.log(newUser);
            let ret=await user.actualizar(newUser);
            
            if(!ret.ok){
                
                ret.url="perfil";
                res.render('pages/error',ret);
            }else{
                
                res.redirect("/")
            }
            //EnviaMail.enviarAdmin("nuevoRegistro",newUser);
            //res.send("ok");
        } catch (error) {
            log.error(error);
            res.status(400).json({error});
        }
    
    }

    Home = async (req, res) => {
        try {
            icarrito.initCarrito(req.user._id);
            let c=await icarrito.getByUsuario(req.user._id);
            
            res.render('pages/main',{
                usuario:req.user.nombre,
                productos:await iproducto.getAll(),
                totalItems:c.productos.length
            });
        } catch (error) {
            log.error(error);
            res.status(400).json({error});
        }
    
    }

    
}
module.exports=usuariosController;
