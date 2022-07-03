const fs=require("fs");


class carrito{
    _carritos=[];
    constructor(){
        
    }

    save(){ 
        let tmp={id:0,timestamp:0,productos:[]};
        console.log(tmp);
        if(this._carritos.length>0){
            tmp.id=this._carritos[this._carritos.length-1].id+1;
        }else{
            tmp.id=1;
        }
        
        this._carritos.push(tmp);
        this.Guardar();
        return tmp.id;
    }

    getById(id){
        console.log(this._carritos);
        return this._carritos.find(c=>c.id==id);
    }

    AgregarProducto(idcarrito,idproducto,productos){
        let tmp=this._carritos.find(c=>c.id==idcarrito);
        
        if(tmp!=null){
           let tmpprod=productos.find(p=>p.id==idproducto)
            
            if(tmpprod!=null){
                tmp.productos.push(tmpprod.id);
                this.Guardar();
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    
    getAll(){
       
        return this._productos;
       
    }
    deleteById(id){
        if(this._carritos.findIndex(c=>c.id==id)!=-1){
            this._carritos.splice(this._carritos.findIndex(c=>c.id==id),1);
            this.Guardar();
            return true;
        }else{
            return false;
        }
       
    }

    deleteByIdCarritoIdProd(idcarrito,idproducto){
        
        let index_carrito=this._carritos.findIndex(c=>c.id==idcarrito);
        if(index_carrito!=-1){
           
            let index_productos=this._carritos[index_carrito].productos.findIndex(p=>p==idproducto);
            if(index_productos!=-1){
                console.log("entro prod");
                this._carritos[index_carrito].productos.splice(index_productos,1);
                this.Guardar();
                return true;
            }else{
                return false;
            }
            
        }else{
            return false;
        }
       
    }

    iniciar(){
        fs.readFile('src/carritos.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            if(data!=""){
                this._carritos=JSON.parse(data);
            }else{
                this._carritos=[];
            }
            
        });
    }
    Guardar(){
        fs.promises.writeFile("src/carritos.txt",JSON.stringify(this._carritos));
    }
    
}
module.exports=carrito;