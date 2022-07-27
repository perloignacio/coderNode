const containerMongo =require('../containers/containerMongo');
const productosSchema=require("./modelSchemas/productosSchema")
const { faker } =require('@faker-js/faker');

faker.locale = 'es';

 class producto extends containerMongo{
    
    constructor(){
       
        super(productosSchema)
    }
    getRandom(){
        let _prods=[];
        for(let i=0;i<=5;i++){
            
            let _p={
                id:faker.datatype.number(),
                nombre:faker.commerce.product(),
                precio:faker.datatype.float({ max: 10000 }),
                thumbnail:faker.image.fashion(1234, 2345, true)
            }
            _prods.push(_p);
        }
        //console.log(_prods)
        return _prods;
        
    }
}
module.exports=producto;