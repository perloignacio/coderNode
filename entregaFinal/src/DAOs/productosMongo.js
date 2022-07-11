const containerMongo =require('../containers/containerMongo');
const mongoose = require('mongoose')
const productosSchema=require("./modelSchemas/productosSchema")
 class producto extends containerMongo{
    
    constructor(){
        
        super(productosSchema)
    }
    
}
module.exports=producto;