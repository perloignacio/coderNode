const axios=require("axios");

axios.get("http://localhost:3000/productos").then((response)=>{
    console.log(response.data);
}).catch((err)=>{
    console.log(err);
})

axios.post("http://localhost:3000/productos",{
    nombre:"test",
    descripcion:"prueba de axios",
    codigo:"test123",
    precio:500,
    stock:10,
    foto:"https://www.servethome.com.ar/api/assets/Productos/0_20220801065546.jpg"
}).then((response)=>{
    console.log(response.data);
}).catch((err)=>{
    console.log(err);
})