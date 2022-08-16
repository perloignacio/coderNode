require("dotenv").config();
const express = require("express");

const connectMongo = require("./config/connectMongo");

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typesDef');
const resolvers = require('./resolvers');
const app = express();
const PORT = process.env.PORT || 3000;

//app.use("/productos", productosRoutes);

// conectando a Mongo con Mongoose
const mongo = new connectMongo();
mongo.connect();
async function start(){
    
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });


    app.listen(PORT, () => console.log("Server up to", PORT));
}

start();

