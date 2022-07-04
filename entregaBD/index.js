const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')

const app = express()
const producto =require('./src/models/productos');
p=new producto();
const mensajes =require('./src/models/mensajes');
msj=new mensajes();


const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('src/public'));

httpServer.listen(8080, () => console.log(`Server on Port ${8080}`))

io.on('connection', (socket) => {
	
	
	socket.on('listaproductos',  async (callback) => {
		let data=await p.getAll();
		io.sockets.emit('productos',data)		
	})

	socket.on('listamensajes',  async (callback) => {
		let data=await msj.getAll();
		io.sockets.emit('mensajes',data)		
	})

	socket.on('agregarProducto', async(data) => {
		p.save(data);
		let prods=await p.getAll();
		io.sockets.emit('productos', prods)
	})
	
	socket.on('agregarMensaje', async(data) => {
		msj.save(data);
		let mensajes=await msj.getAll();
		io.sockets.emit('mensajes',mensajes)	
	})
})
