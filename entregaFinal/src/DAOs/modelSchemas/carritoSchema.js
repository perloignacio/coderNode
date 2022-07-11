const mongoose = require('mongoose')
const collection="carritos";
const carritoSc=new mongoose.Schema({
    id:{type:Number},
    timestamp:{type:Number},
    productos:{type:Array},
})
const carritoSchema=mongoose.model(collection,carritoSc);
module.exports=carritoSchema;