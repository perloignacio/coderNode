 
 class containerMongo{
    _objs=[];
    _modelo;
    constructor(model){
       this._modelo=model;
    }

    async insert(obj){ 
        var d = new this._modelo(obj)
        let error = d.validateSync();
        if(!error){
            d.save()
            return true;
        }else{
            return false;
        }
        
        
        
        
    }

    async getById(id){
        let obj=await this._modelo.findOne({id:id});
        return obj;
        
    }

   async update(id,obj){
    
    const doc = await this._modelo.findOne({id:id});

    doc.overwrite(obj);
    await doc.save();
    return true;
       
        
   }
    async getAll(id){
        let obj=await this._modelo.find();
        return obj;
        
    }
   async deleteById(id){
      await this._modelo.deleteOne({id:id});
      return true;
      
   }

   

   async iniciar(){
             
   
   }

   async Guardar(){
       
   }

   
   
}
module.exports=containerMongo;
