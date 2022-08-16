const ProductosMongo = require('./dao/productosMongo');

const pm =new ProductosMongo();
const resolvers = {
    Query: {
        getAll: async () => {
            const products = await pm.getAll();
            return products;
        },
        getById: async (parent, args) => {
            console.log(args);
            const productR = await pm.getOne(args.id);
            return productR;
        }
    },
    Mutation: {
        createProducto: async (parent, args, context, info) => {
            const data = {
                nombre:args.nombre,
                descripcion:args.descripcion,
                codigo:args.codigo,
                precio:args.precio,
                stock:args.stock,
                foto:args.foto,
                
            }
           
            newProduct=await pm.save(data);
            // console.log(parent, args, context, info);
            return newProduct;
        },
        updateProducto: async (parent, args, context, info) => {
            const data = {
                nombre:args.nombre,
                descripcion:args.descripcion,
                codigo:args.codigo,
                precio:args.precio,
                stock:args.stock,
                foto:args.foto                
            }
            const id = args.id;
            await pm.update(id,data);
            const productR = await pm.getOne(args.id);
            return productR;
            
        },
        deleteProducto: async (parent, args, context, info) => {
            console.log(args.id);
            let result=await pm.delete(args.id);
            console.log(result);
            const productR = await pm.getAll();
            return productR;
            
        }
    }
}

module.exports = resolvers;