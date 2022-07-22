const express = require('express');
const process = require('process');
const cpus=require("os").cpus().length;
const routerInfo = express.Router();
routerInfo.get("/info",(req,res)=>{
    res.json({
        cpus:cpus,
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