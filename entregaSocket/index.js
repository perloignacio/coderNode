const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')

const app = express()
const producto =require('./src/models/productos');
p=new producto();
const mensajes =require('./src/models/mensajes');
msj=new mensajes();
msj.iniciar();

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
p.save({title:"Membresia flickr",price:52.2,thumbnail:"https://cdn0.iconfinder.com/data/icons/social-circle-3/72/Flickr-256.png"});
p.save({title:"Membresia pinteres",price:45.0,thumbnail:"https://cdn3.iconfinder.com/data/icons/social-network-2/512/650851-pinterest-256.png"});

app.use(express.static('src/public'));

httpServer.listen(8080, () => console.log(`Server on Port ${8080}`))

io.on('connection', (socket) => {
	
	socket.emit('productos', p.getAll())

	socket.on('agregarProducto', data => {
		p.save(data);
		io.sockets.emit('productos', p.getAll())
	})

	socket.emit('mensajes', msj.getAll())
	socket.on('agregarMensaje', data => {
		msj.save(data);
		io.sockets.emit('mensajes', msj.getAll())
	})
})
