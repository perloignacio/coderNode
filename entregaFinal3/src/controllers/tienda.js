
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

class tiendaController{
    constructor(){

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

    Carrito = async (req, res) => {
        try {
            //icarrito.initCarrito(req.user._id);
            let c=await icarrito.getByUsuario(req.user._id);
            let items=[];
            let acu=0;
            for(const p of c.productos){
                let prod=await iproducto.getById(p.producto)
                acu+=prod.precio*p.cantidad;
                items.push({
                    producto:prod,
                    cantidad:p.cantidad
                })
            };
            
           
            res.render('pages/carrito',{
                usuario:req.user.nombre,
                items:items,
                totalItems:c.productos.length,
                total:acu
            });
        } catch (error) {
            log.error(error);
            res.status(400).json({error});
        }
    
    }

    
}
module.exports=tiendaController;
