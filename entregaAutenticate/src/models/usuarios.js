const containerMongo =require('../containers/containerMongo');
const usuariosSchema=require("./modelSchemas/usuariosSchema")
const bcrypt = require('bcrypt');
 class producto extends containerMongo{
    
    constructor(){
        
        super(usuariosSchema)
        
    }
    
    async guardar(obj){
        
        let ret;
        let user=await this._modelo.findOne({email:obj.email});
        if(user){
            return ret={ok:false,result:"Ya existe un usuario con ese email en nuestra base de datos",data:null};
        }
        let hash=await bcrypt.hash(obj.contra,10);
	    await this.insert({email:obj.email,contra:hash});
        return ret={ok:true,result:"El usuario se guardo correctamente",data:null};
        
    }

    async login(obj){
        
        let ret="";
        let user=await this._modelo.findOne({email:obj.email});
        if(!user){
            return ret={ok:false,result:"usuario / contraseña incorrectas",data:null};
           
        }
        let band=await bcrypt.compare(obj.contra, user.contra);
        if(band){
            return ret={ok:true,result:"",data:user};
        }else{
            return ret={ok:false,result:"usuario / contraseña incorrectas",data:null};
        }
       
    }

    async obtenerByEmail(email){
        
        
        let user=await this._modelo.findOne({email:email});
        return user;
       
    }
}
module.exports=producto;