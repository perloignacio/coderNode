
const containerFile =require('../containers/containerFile');

class carrito extends containerFile{
   
    constructor(){
        super('carritos.txt')
    }
    
    async saveCarrito(){ 
        let tmp={id:0,timestamp:0,productos:[]};
        let op=await this.insert(tmp);
        return op;
    }

    

    async AgregarProducto(id,idproducto){
        let tmp=await this.getById(id);
        if(tmp!=null){
            tmp.productos.push(idproducto);
            
            return await this.update(id,tmp);
            
        }else{
            return false;
        }
    }
    
    
    async deleteByIdCarritoIdProd(id,idproducto){
        
        let tmp=await this.getById(id);
        if(tmp!=null){
            let index_productos=tmp.productos.findIndex(p=>p==idproducto);
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