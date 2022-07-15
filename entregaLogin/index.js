const express = require('express')

const { normalize, denormalize, schema } = require('normalizr');

const cookieParser=require("cookie-parser");
const session=require("express-session");
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



const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(session({
	store:MongoStore.create({mongoUrl:conexion._url,mongoOptions:conexion._AdvOptions}),
	secret:"MongoCoder",
	resave:false,
	cookie: {
		name:"sessionCoder",
		expires: 600000
	}
}))

const checkSession=(req,res,next)=>{
	console.log(req.session.id)
	if(req.session?.usuario && req.session?.autenticado){
		next();	
	}else{
		res.render("login");
	}
	
}


app.use(express.static('src/public'));

app.engine("hbs",handlebars.engine());
app.set("view engine","hbs");
app.set("views","./src/views");
app.use(express.json());
app.use(express.urlencoded({extended:true}));




app.get("/",checkSession,(req,res)=>{
	res.render('main',{usuario:req.session.usuario});
})
app.post("/login",(req,res)=>{
	req.session.usuario=req.body.nombre;
	req.session.autenticado=true;
	res.redirect("/")
})
app.post("/salir",(req,res)=>{
	let nombre=req.session.usuario;
	req.session.destroy()
	res.render("salir",{usuario:nombre})
})
app.get("/api/productos-test",(req,res)=>{
    res.render('lista',{productos:p.getRandom()});
})

httpServer.listen(8080, () => console.log(`Server on Port ${8080}`))

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
