 const {options}=require('../config/config');
 const mongoose = require('mongoose')
 class containerMongo{
    _objs=[];
    _modelo;
    constructor(model){
       this._modelo=model;
    }

    async insert(obj){ 
        console.log(obj);
        var d = new this._modelo(obj)
        let error = d.validateSync();
        console.log(error);
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
