const express = require('express');
const {fork} =require('child_process');


const randomRoute = express.Router();
randomRoute.get("/random",(req,res)=>{
    const rand=fork("./src/random.js",[req.query.cant])
    rand.send("random");
    rand.on("message",numeros=>{
        res.json(numeros);
    })
})

module.exports = randomRoute;