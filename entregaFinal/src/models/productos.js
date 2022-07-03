const fs=require("fs");
 class producto{
     _productos=[];
    constructor(){
        
    }

    save(obj){ 
        if(this._productos.length>0){
            obj.id=this._productos[this._productos.length-1].id+1;
        }else{
            obj.id=1;
        }
        obj.timestamp=Date.now();
        this._productos.push(obj);
        this.Guardar();
    }

    getById(id){
        
        return this._productos.find(p=>p.id==id);
         
    }

    update(id,obj){
        obj.id=id;
        if(this._productos.findIndex(p=>p.id==id)!=-1){
            this._productos[this._productos.findIndex(p=>p.id==id)]=obj;
            this.Guardar();
            return true;
        }else{
            return false;
        }
        
         
    }
    getAll(){
       
        return this._productos;
       
    }
    deleteById(id){
        if(this._productos.findIndex(p=>p.id==id)!=-1){
            this._productos.splice(this._productos.findIndex(p=>p.id==id),1);
            this.Guardar();
            return true;
        }else{
            return false;
        }
       
    }

    

    iniciar(){
        
        fs.readFile('src/productos.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            if(data!=""){
                this._productos=JSON.parse(data);
            }else{
                this._productos=[];
            }
            
        });
    }

    Guardar(){
        fs.promises.writeFile("src/productos.txt",JSON.stringify(this._productos));
    }
    
}
module.exports=producto;
