const ContainerFirebase =require('../containers/ContainerFirebase');
const collection=require("./modelFirebases/carritoCollection");

class carrito extends ContainerFirebase{
   
    constructor(){
        
        super(collection)
    }
    
    async saveCarrito(){ 
        let tmp={timestamp:0,productos:[]};
        let op=await this.insert(tmp);
        return op;
    }

    

    async AgregarProducto(id,idproducto){
        let res=await this.collection.doc(`${id}`).get()
        let tmp=res.data()
        if(tmp){
            tmp.productos.push(idproducto);
            return await this.update(id,tmp);
        }else{
            return false;
        }
    }
    
    
    async deleteByIdCarritoIdProd(id,idproducto){
        
        let tmp=await this.getById(id);
        if(tmp!=null){
            console.log(tmp);
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