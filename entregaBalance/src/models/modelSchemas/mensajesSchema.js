const mongoose = require('mongoose')
const collection="mensajes";
const mensajesSc=new mongoose.Schema({
    autor:new mongoose.Schema({
        id:{type:String},
        nombre:{type:String},
        apellido:{type:String},
        edad:{type:Number},
        alias:{type:String},
        avatar:{type:String},
    }),
    fecha:{type:String},
    mensaje:{type:String}
})
const mensajeschema=mongoose.model(collection,mensajesSc);
module.exports=mensajeschema;