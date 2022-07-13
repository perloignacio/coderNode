const express = require('express')
const util = require('util')
function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true))
}
const { normalize, denormalize, schema } = require('normalizr');
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

const authorSchema = new schema.Entity('autores')
const messageSchema = new schema.Entity('mensajes', {
  autor: authorSchema,
},{idAttribute:'_id'})
const global = new schema.Entity('global', {
  messages: [messageSchema],
})




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
		let messages = JSON.parse(JSON.stringify(await msj.getAll()));
		const data = { id: 'mensajes',messages }
		const norma=normalize(data,global)
		print(norma);
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
		//print(norma);
		io.sockets.emit('mensajes',norma)		
	})
})
