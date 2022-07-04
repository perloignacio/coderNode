const {options}=require('../scripts/conexionSql');
const knex=require('knex')(options);

class mensajes{
    _mensajes=[];
   constructor(){
       
   }

   save(obj){
        knex('mensajes').insert({
            autor:obj.autor,
            mensaje:obj.mensaje,
            fecha:obj.fecha
        }).then((rows)=>{
        return true;
        }).catch((err)=>{
            console.log(err);
            return false;
        });
       
       
   }
   
   async getAll(){
       
        let resultado=await knex.from('mensajes').select("*");
        let res=[];
        resultado.forEach(Element=>{
            res.push({...Element});
        })
        return res;
   
   
    }
   
   
}
module.exports=mensajes;