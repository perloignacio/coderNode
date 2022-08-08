require("dotenv").config();

const express = require("express");

const userRouter = require("./routes/user");
const connectMongo = require("./config/connectMongo");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use("/usuarios", userRouter);

// conectando a Mongo con Mongoose
const mongo = new connectMongo();
mongo.connect();

app.listen(PORT, () => console.log("Server up to", PORT));
