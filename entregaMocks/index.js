const express = require('express')


const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const handlebars=require("express-handlebars");

const app = express()
const producto =require('./src/models/productos');
p=new producto();
const mensajes =require('./src/models/mensajes');
msj=new mensajes();
msj.iniciar();
p.iniciar();

const normalizr=require("normalizr");
const schema=normalizr.schema;

//const mensajes=new schema.Entity('mensaje')
const autor=new schema.Entity('autor')



const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('src/public'));

app.engine("hbs",handlebars.engine());
app.set("view engine","hbs");
app.set("views","./src/views");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

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
		let data=await msj.getAll();
		const norma=normalizr.normalize(data,[autor])
		//console.log(JSON.stringify(norma));
		io.sockets.emit('mensajes',norma)		
	})

	socket.on('agregarProducto', async(data) => {
		p.insert(data);
		let prods=await p.getAll();
		io.sockets.emit('productos', prods)
	})
	
	socket.on('agregarMensaje', async(data) => {
		msj.guardar(data);
		let mensajes=await msj.getAll();
		io.sockets.emit('mensajes',mensajes)	
	})
})
