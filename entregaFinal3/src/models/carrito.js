const containerMongo =require('../containers/containerMongo');
const carritoSchema=require("./modelSchemas/carritoSchema");

class carrito extends containerMongo{
   
    constructor(){
        
        super(carritoSchema)
    }
    
    async initCarrito(idusuario){ 
        let tmp=await carritoSchema.findOne({usuario:idusuario});
        if(tmp==null){
            let tmp={timestamp:0,productos:[],usuario:idusuario};
            let op=await this.insert(tmp);
            return op;
        }else{
            return true;
        }
        
    }

    async getByUsuario(idusuario){ 
        let tmp=await carritoSchema.findOne({usuario:idusuario});
        if(tmp!=null){
            return tmp;
        }else{
            return null;
        }
        return op;
    }

    

    async AgregarProducto(id,idproducto,cantidad){
        console.log(cantidad);
        let tmp=await carritoSchema.findOne({_id:id});
        
        if(tmp!=null){
            tmp.productos.push({producto:idproducto,cantidad:cantidad});
            return await this.update(id,tmp);
        }else{
            return false;
        }
    }
    
    
    async deleteByIdCarritoIdProd(id,idproducto){
        
        let tmp=await this.getById(id);
        if(tmp!=null){
            
            let index_productos=tmp.productos.findIndex(p=>p.producto==idproducto);
            if(index_productos!=-1){
                tmp.productos.splice(index_productos,1);
                return await this.update(id,tmp);
            }else{
                return false;
            }
            
        }else{
            return false;
        }
       
    }

    
}
module.exports=carrito;