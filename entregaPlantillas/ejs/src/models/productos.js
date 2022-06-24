
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
        
        this._productos.push(obj);
        
    }
    getById(id){
        
        return this._productos.find(p=>p.id==id);
         
    }

    update(id,obj){
        obj.id=id;
        if(this._productos.findIndex(p=>p.id==id)!=-1){
            this._productos[this._productos.findIndex(p=>p.id==id)]=obj;
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
            return true;
        }else{
            return false;
        }
       
    }
    
}
module.exports=producto;
