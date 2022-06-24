const express=require("express");
const app=express();
const handlebars=require("express-handlebars");
const producto =require('./src/models/productos');
p=new producto();


app.engine("hbs",handlebars.engine());
app.set("view engine","ejs");
app.set("views","./src/views");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render('formulario',{});
})

app.get("/productos",(req,res)=>{
    res.render('lista',{productos:p.getAll()});
})

app.post('/productos', function (req, res, next) {
    p.save(req.body);
    res.redirect('/productos')
    //res.send("ok");
})


const port=8080;

app.listen(port,err=>{
    if(err){console.log("error",err)};
    console.log("escuchando");
})

