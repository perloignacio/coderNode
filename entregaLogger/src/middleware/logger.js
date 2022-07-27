
function LoggerRequest(req, res, next) {
    const pino=require("pino");
    const loggerInfo = pino()
    loggerInfo.level="info";
    loggerInfo.info({method:req.method,url:req.originalUrl})
    next();
}
module.exports=LoggerRequest;