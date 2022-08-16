const mongoose = require("mongoose");

const productosSchema = new mongoose.Schema({
    id:{type:Number},
    timestamp:{type:Number},
    nombre:{type:String},
    descripcion:{type:String},
    codigo:{type:String},
    precio:{type:Number},
    stock:{type:Number},
    foto:{type:String}
});

module.exports = mongoose.model("productos", productosSchema);
