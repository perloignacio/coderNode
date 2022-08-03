 class containerMongo{
    _objs=[];
    _modelo;
    constructor(model){
       this._modelo=model;
    }

    async insert(obj){ 
        var d = new this._modelo(obj)
        console.log(d);
        let error = d.validateSync();
        if(!error){
            d.save()
            return true;
        }else{
            return false;
        }
        
        
        
        
    }

    async getById(id){
        
        let obj=await this._modelo.findOne({_id:id});
        
        return obj;
        
    }

   async update(id,obj){
    const updated = await this._modelo.findOneAndUpdate({ _id: id },obj);
    return updated;
    
       
        
   }
    async getAll(id){
        let obj=await this._modelo.find();
        return obj;
        
    }
   async deleteById(id){
      await this._modelo.deleteOne({_id:id});
      return true;
      
   }

   

   
   
   
   
}
module.exports=containerMongo;
