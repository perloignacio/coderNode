 const {options}=require('../configs/config');
 const mongoose = require('mongoose')
 class containerMongo{
    _objs=[];
    _modelo;
    constructor(model){
       this._modelo=model;
    }

    async insert(obj){ 
        var tmp = await this._modelo.find().limit(1).sort({'id':-1});
        if(tmp[0]){
            obj.id=tmp[0].id+1;
        }else{
            obj.id=1;
        }
        
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
    console.log(this._modelo)
    const doc = await this._modelo.findOne({id:id});

    // Sets `name` and unsets all other properties
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
      mongoose.connect(options.MongoDb, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
      }, () => console.log('Connected'))       
   
   }

   async Guardar(){
       
   }

   
   
}
module.exports=containerMongo;
