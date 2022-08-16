const { gql } = require('apollo-server-express');


const typeDefs = gql`
    type Producto {
        id: ID
        _id:String
        nombre: String
        descripcion: String
        codigo: String
        precio: Float
        stock: Float
        foto: String
    }
    type Query {
        getAll: [Producto]
        getById(id: ID): Producto
        # getById: [Producto]
    }
    type Mutation {
        createProducto(nombre: String, descripcion: String, codigo: String, precio: Float,stock: Float,foto:String): Producto
        updateProducto(id: ID, nombre: String, descripcion: String, codigo: String, precio: Float,stock: Float,foto:String): Producto
        deleteProducto(id: ID!): Producto
    }
    `;

module.exports = typeDefs;