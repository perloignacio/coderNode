require("dotenv").config();
const cors = require('cors');
const express = require("express");

const productosRoutes = require("./routes/productos");
const connectMongo = require("./config/connectMongo");


const app = express();
const PORT = process.env.PORT || 3000;
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/
app.use(express.json());

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use("/productos", productosRoutes);

// conectando a Mongo con Mongoose
const mongo = new connectMongo();
mongo.connect();

app.listen(PORT, () => console.log("Server up to", PORT));
