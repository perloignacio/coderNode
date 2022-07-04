const {options}=require('../scripts/conexionMaria');
const knex=require('knex')(options);
class producto{
     
    constructor(){
        
    }

    save(obj){
        knex('productos').insert({
            nombre:obj.title,
            precio:obj.price,
            thumbnail:obj.thumbnail
        }).then((rows)=>{
           return true;
        }).catch((err)=>{
            console.log(err);
            return false;
        });
        
    }
    getById(id){
        return knex.from('productos').select("*").where('id',id).then((rows)=>{
            return rows;
        }).catch((err)=>{
            console.log(err);
        });
    }

    update(id,obj){
        knex('productos').where('id',id).update({
            nombre:obj.title,
            precio:obj.price,
            thumbnail:obj.thumbnail
        }).then((rows)=>{
            return true;
         }).catch((err)=>{
             console.log(err);
             return false;
         });
        
         
    }

    async getAll(){
       
        let resultado=await knex.from('productos').select("*");
        let res=[];
        resultado.forEach(Element=>{
            res.push({...Element});
        })
       return res;
       
       
    }
    deleteById(id){
        knex('productos').where('id',id).del().then((rows)=>{
            return true;
         }).catch((err)=>{
             console.log(err);
             return false;
         });
       
    }
    
}
module.exports=producto;
