const mongoose = require('mongoose')
const collection="productos";
const ProductosSc=new mongoose.Schema({
    nombre:{type:String},
    precio:{type:Number},
    thumbnail:{type:String},
    
})

const productosSchema=mongoose.model(collection,ProductosSc);
module.exports=productosSchema;
