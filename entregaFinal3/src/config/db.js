const mongoose = require('mongoose')
class mongo{
    constructor(){

    }

    async conectarDB(){
        
        try{
            await mongoose.connect(process.env.BD,{
                useNewUrlParser:true,
                useUnifiedTopology:true,
            });
            return "conectado";
        } catch(e){
            throw new Error(`Error en DB ${e.message}`);
        }
        
    }
}
module.exports=mongo;