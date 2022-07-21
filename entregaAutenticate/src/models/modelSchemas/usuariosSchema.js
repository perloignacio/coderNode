const mongoose = require('mongoose')
const collection="usuarios";
const usuariosSc=new mongoose.Schema({
    email:{type:String},
    contra:{type:String},
})
const usuarioschema=mongoose.model(collection,usuariosSc);
module.exports=usuarioschema;