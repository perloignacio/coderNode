const express = require('express')


const { normalize, denormalize, schema } = require('normalizr');
const auth=require("./src/middleware/session");

const cookieParser=require("cookie-parser");
const session=require("express-session");
const passport=require("passport");

const LocalStrategy=require("passport-local").Strategy;
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



app.use(passport.initialize());
app.use(passport.session());

passport.use("login",new LocalStrategy(
	(username,password,done)=>{
		
		user.login({email:username,contra:password}).then((u)=>{
			console.log(u);
			if(!u.ok){
				return done(null,false);	
			}else{
				return done(null,u.data)
			}
		})
	}
));
passport.serializeUser((user,done)=>{
	
	done(null,user._id)
})
passport.deserializeUser((id,done)=>{
	
	user.getById(id).then((u)=>{
		done(null,u);
	})
});	


app.use(express.static('src/public'));

app.engine("hbs",handlebars.engine());
app.set("view engine","hbs");
app.set("views","./src/views");
app.use(express.json());
app.use(express.urlencoded({extended:true}));




app.get("/",auth.checkSession,(req,res)=>{
	
	res.render('main',{usuario:req.user.email});
})
app.get("/errorLogin",(req,res)=>{
	res.render('error',{result:'usuario / contraseña incorrectas',url:'login'});
})
app.get("/login",(req,res)=>{
	res.render('login');
})
app.get("/registro",(req,res)=>{
	res.render('register');
})
app.post("/login",passport.authenticate("login",{failureRedirect:'/errorLogin'}),async (req,res)=>{
	res.redirect("/")
})

app.post("/registro",async (req,res)=>{
	
	let ret=await user.guardar(req.body);
	if(!ret.ok){
		ret.url="registro";
		res.render('error',ret);
	}else{
		res.redirect("/login")
	}
	
})
app.post("/salir",(req,res)=>{
	let nombre=req.user.email;
	req.logout(function(err) {
		
		if (err) { return next(err); }
		req.session.destroy();
		res.render("salir",{usuario:nombre})
	});
	
	
})
app.get("/api/productos-test",(req,res)=>{
    res.render('lista',{productos:p.getRandom()});
})

httpServer.listen(8083, () => console.log(`Server on Port ${8080}`))

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
