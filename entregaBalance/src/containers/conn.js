const {options}=require('../config/config');
const mongoose = require('mongoose')

class conn{
    _url="";
    _AdvOptions;
    constructor(){
        this._url=options.MongoDb;
        this._AdvOptions={useNewUrlParser: true, useUnifiedTopology: true}
    }
    
    

    iniciar(){
        mongoose.connect(this._url, this._AdvOptions, () => console.log('Connected'))
    }
}
module.exports=conn;