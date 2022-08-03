const productos=require("../models/productos");
const iproducto=new productos();

const logger=require("../helpers/logger");
const log=new logger();
class productosController{
    constructor(){

    }
    ObtenerTodos = async (req, res) => {
        try {
            let id = req.params.id;
            if (!id) {
                let resultado =await iproducto.getAll();
                res.json(resultado);
            }else{
                let resultado =await iproducto.getById(id)
                res.json(resultado);
            }
        } catch (error) {
            log.error(error);
            res.status(400).json({error});
        }
    
    }

    AgregarProducto = async (req, res) => {
        try {
            let resultado=await iproducto.insert(req.body);
            if(resultado){
                res.json("Ok");
            }else{
                res.json("Error");
            }
        } catch (error) {
            log.error(error);
            res.status(400).json({error});
        }
    
    }

    ModificarProducto = async (req, res) => {
        try {
            let resultado=await iproducto.update(req.params.id,req.body);
            if(resultado){
                res.json("Ok");
            }else{
                res.status(404).json({error:"Producto no encontrado"});
            }
        } catch (error) {
            log.error(error);
            res.status(400).json({error});
        }
    
    }

    BorrarProducto=async (req, res) => {
        try {
            let resultado=await iproducto.deleteById(req.params.id)
            if(resultado){
                res.json("Ok");
            }else{
                res.status(404).json({error:"Producto no encontrado"});
            }
        } catch (error) {
            log.error(error);
            res.status(400).json({error});
        }
    
    }

    
    
}

module.exports=productosController;
