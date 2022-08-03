require('dotenv').config()
const cluster=require("cluster");
const cpus=require("os").cpus().length;
if(cluster.isMaster){
	for(let i=0;i<=cpus;i++){
		cluster.fork();
	}
	cluster.on("exit",(worker,code,signal)=>{
		console.log(`Salio ${worker.process.pid}`)
	})
}else{ 
    const express = require('express');
    const mongo =require("./src/config/db");
    const logger=require("./src/helpers/logger");
    const session=require("./src/config/passport");
    const passport=require("passport");
    const cookieParser=require("cookie-parser");
    const fileUpload =require('express-fileupload');
    const handlebars=require("express-handlebars");


    const usuariosRoutes=require("./src/routes/usuarios");
    const productosRoutes=require("./src/routes/productos");
    const carritoRoutes=require("./src/routes/carrito");
    const tiendaRoutes=require("./src/routes/tienda");


    const path =require('path');
    const log=new logger();
    const app = express();


    app.use( express.static('./src/public') );
    app.use(cookieParser());
    app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : 'src/public/uploads/',
        createParentPath:true
    }));


    app.use(session.baseSession);
    session.initPassport();
    app.use(passport.initialize());
    app.use(passport.session());
    app.engine(
        "hbs",
        handlebars.engine({
            extname: ".hbs",
            defaultLayout: "main.hbs",
            layoutsDir: path.join(__dirname,'src/views/layouts/'),
            partialsDir: path.join(__dirname,'src/views/partials/'),
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            }
        })
    );

    app.set("views", "./src/views");
    app.set("view engine", "hbs");
    app.use(express.json()) // for parsing application/json
    app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

    app.use("/",usuariosRoutes)
    app.use("/",tiendaRoutes)
    app.use("/api",productosRoutes)
    app.use("/api",carritoRoutes)
    app.get('*', function(req, res){
        log.warning({method:req.method,url:req.originalUrl})
        res.status(404).send('what???');
    });

    server=app.listen(9000,()=>{
        log.info("conectado al puerto "+process.env.PUERTO)
        let db=new mongo();
        db.conectarDB().then((msj)=>{
            log.info(msj)
        })
        /*log.info("Escuchando");
        console.log("Escuchando")*/
    })

    process.on('uncaughtException', function (err) {
        log.error(err);
    });
}
