const carrito=require("../models/carrito");
const icarrito=new carrito();

const productos=require("../models/productos");
const iproducto=new productos();

const logger=require("../helpers/logger");
const log=new logger();


const email=require("../helpers/email");
let EnviaMail=new email();

const phoneHelper=require("../helpers/phone");
let notificacion=new phoneHelper();

class carritoController{
    constructor(){

    }
    ObtenerProductosCarrito = async (req, res) => {
        try {
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
        } catch (error) {
            log.error(error);
            res.status(400).json({error});
        }
    
    }

    AgregarProductos= async(req,res)=>{
        try{
            let c=await icarrito.getByUsuario(req.user._id);

            let resultado=await icarrito.AgregarProducto(c._id,req.body.idproducto,req.body.cantidad);

            if(resultado){
                res.redirect("/")
            }else{
                res.status(404).json({error:"Producto no encontrado"});
            }
        }catch(err){
            log.error(error);
            res.status(400).json({error});
        }
        
    }

    CrearCarrito= async(req,res)=>{
        try{
            res.json(await icarrito.saveCarrito());
        }catch(err){
            log.error(error);
            res.status(400).json({error});
        }
         
    }

    BorrarCarrito= async(req,res)=>{
        try{
            let resultado=await icarrito.deleteById(req.params.id);
            if(resultado){
                res.json("Ok");
            }else{
                res.status(404).json({error:"Producto no encontrado"});
            }
        }catch(err){
            log.error(error);
            res.status(400).json({error});
        }
         
    }

    QuitarProducto= async(req,res)=>{
        try{
            let c=await icarrito.getByUsuario(req.user._id);
            console.log(req.body.id_prod);
            let resultado=await icarrito.deleteByIdCarritoIdProd(c._id,req.body.id_prod)
            if(resultado){
               res.redirect("/carrito");
            }else{
                res.status(404).json({error:"Producto no encontrado"});
            }
        }catch(err){
            log.error(error);
            res.status(400).json({error});
        }
         
    }

    Confirmar= async(req,res)=>{
        try{
            let c=await icarrito.getByUsuario(req.user._id);
            let items=[];
            let acu=0;
            for(const p of c.productos){
                let prod=await iproducto.getById(p.producto)
                acu+=prod.precio*p.cantidad;
                items.push({
                    nombre:prod.nombre,
                    foto:prod.foto,
                    cantidad:p.cantidad,
                    precio:prod.precio
                })
            };
            let data={
                user:req.user,
                total:acu,
                productos:items
            }
            await EnviaMail.enviarAdmin("nuevoPedido",data);
            const smsMsg = `Gracias ${req.user.nombre}, hemos recibido su pedido y se encuentra en proceso de preparación. Próximamente recibirá novedades en su email.`
            const whatMsg = `Nuevo pedido de ${req.user.nombre} (${req.user.email})`
            await notificacion.EnviarMsj(smsMsg,false);
            await notificacion.EnviarMsj(whatMsg,true);
            c.productos=[];
            let resultado=await icarrito.update(c._id,c);
            if(resultado){
               res.redirect("/gracias");
            }else{
                res.status(404).json({error:"Producto no encontrado"});
            }
        }catch(err){
            log.error(err);
            res.status(400).json({err});
        }
         
    }

    Vaciar= async(req,res)=>{
        try{
            let c=await icarrito.getByUsuario(req.user._id);
            c.productos=[];
            let resultado=await icarrito.update(c._id,c);
            if(resultado){
                res.redirect("/")
            }else{
                res.status(404).json({error:"Error inesperado"});
            }
        }catch(err){
            log.error(err);
            res.status(400).json({err});
        }
         
    }

    

    

   
}


module.exports=carritoController