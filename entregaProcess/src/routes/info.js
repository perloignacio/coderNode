const express = require('express');
const process = require('process');

const routerInfo = express.Router();
routerInfo.get("/info",(req,res)=>{
    res.json({
        argumentos:process.argv,
        plataforma:process.platform,
        version:process.version,
        memoria:process.memoryUsage.rss(),
        path:process.execPath,
        id:process.pid,
        carpeta:process.cwd(),

    })
})

module.exports = routerInfo;