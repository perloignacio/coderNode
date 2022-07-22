const express = require('express');
const {fork} =require('child_process');


const randomRoute = express.Router();
randomRoute.get("/random",(req,res)=>{
    
    let _cant=1000;
    if(req.query.cant){
        _cant=req.query.cant
    }
    
    const rand=fork("./src/random.js",[_cant])
    rand.send("random");
    rand.on("message",numeros=>{
        res.json(numeros);
    })
})

module.exports = randomRoute;