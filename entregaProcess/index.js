
require('dotenv').config()
const yargs=require("yargs/yargs")(process.argv.slice(2))
const args=yargs.default({port:8082}).argv;
const express = require('express')
const { normalize, denormalize, schema } = require('normalizr');


const cookieParser=require("cookie-parser");
const session=require("express-session");
const passport=require("passport");


const MongoStore=require("connect-mongo");

const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const handlebars=require("express-handlebars");
const global=require("./src/normalizr/schemas")
const conn=require("./src/containers/conn")
const app = express()

conexion=new conn();
conexion.iniciar();

const producto =require('./src/models/productos');
p=new producto();
const mensajes =require('./src/models/mensajes');
msj=new mensajes();
const usuarios =require('./src/models/usuarios');
user=new usuarios();


const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
app.use(cookieParser()) 
app.use(session({
	store:MongoStore.create({mongoUrl:conexion._url,mongoOptions:conexion._AdvOptions}),
	secret:"MongoCoder",
	resave:true,
	rolling:true,
	saveUninitialized:false,
	cookie: {
		name:"sessionCoder",
		expires: 600000,
	}
}))

const loginRoutes = require('./src/routes/login');
const productosRoutes = require('./src/routes/productos');
const infoRoutes = require('./src/routes/info');
const randomRoutes = require('./src/routes/random');

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('src/public'));
app.engine("hbs",handlebars.engine());
app.set("view engine","hbs");
app.set("views","./src/views");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("",loginRoutes);

app.use("",infoRoutes)
app.use("/api/",productosRoutes);
app.use("/api/",randomRoutes);




httpServer.listen(args.port, () => console.log(`Server on Port ${args.port}`))

io.on('connection', (socket) => {
	
	socket.on('listaproductos',  async (callback) => {
		let data=await p.getAll();
		io.sockets.emit('productos',data)		
	})

	socket.on('listamensajes',  async (callback) => {
		let messages = JSON.parse(JSON.stringify(await msj.getAll()));
		const data = { id: 'mensajes',messages }
		const norma=normalize(data,global)
		io.sockets.emit('mensajes',norma)		
	})

	socket.on('agregarProducto', async(data) => {
		p.insert(data);
		let prods=await p.getAll();
		io.sockets.emit('productos', prods)
	})
	
	socket.on('agregarMensaje', async(data) => {
		msj.guardar(data);
		let messages = JSON.parse(JSON.stringify(await msj.getAll()));
		const datos = { id: 'mensajes',messages }
		const norma=normalize(datos,global)
		io.sockets.emit('mensajes',norma)		
	})
})
