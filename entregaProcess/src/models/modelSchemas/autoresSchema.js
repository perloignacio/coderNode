const mongoose = require('mongoose')
const collection="autores";
const autoresSc=new mongoose.Schema({
    id:{type:String},
    nombre:{type:String},
    apellido:{type:String},
    edad:{type:Number},
    alias:{type:String},
    avatar:{type:String},
})
const autoreschema=mongoose.model(collection,autoresSc);
module.exports={autoreschema,autoresSc};