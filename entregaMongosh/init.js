

db = connect("mongodb://localhost:27017/ecommerce")

db.productos.drop()
db.createCollection("productos");
db.productos.insertOne({title:'prod1','precio':700,thumbnail:'https://randomwordgenerator.com/img/picture-generator/57e1d0434a56af14f1dc8460962e33791c3ad6e04e50744172277ed79e45c5_640.jpg'})
db.productos.insertOne({title:'prod2','precio':800,thumbnail:'https://randomwordgenerator.com/img/picture-generator/53e3d6414d54af14f1dc8460962e33791c3ad6e04e507440762e7ad39348c3_640.jpg'})
db.productos.insertOne({title:'prod3','precio':750,thumbnail:'https://randomwordgenerator.com/img/picture-generator/vietnam-4949917_640.jpg'})
db.productos.insertOne({title:'prod4','precio':1200,thumbnail:'https://randomwordgenerator.com/img/picture-generator/55e7d5414c55a814f1dc8460962e33791c3ad6e04e50744172287edc9f48cc_640.jpg'})
db.productos.insertOne({title:'prod5','precio':1700,thumbnail:'https://randomwordgenerator.com/img/picture-generator/55e8d2474a52ac14f1dc8460962e33791c3ad6e04e50744074267bd69348cc_640.jpg'})
db.productos.insertOne({title:'prod6','precio':4700,thumbnail:'https://randomwordgenerator.com/img/picture-generator/50e7d6464d53b10ff3d8992cc12c30771037dbf85254794074297edc974e_640.jpg'})
db.productos.insertOne({title:'prod7','precio':1588,thumbnail:'https://randomwordgenerator.com/img/picture-generator/57e0d6434d5baa14f1dc8460962e33791c3ad6e04e5074417d2e7ed7974bc4_640.jpg'})
db.productos.insertOne({title:'prod8','precio':500,thumbnail:'https://randomwordgenerator.com/img/picture-generator/57e2d64a4a55ab14f1dc8460962e33791c3ad6e04e50744172297cdc9f45c3_640.jpg'})
db.productos.insertOne({title:'prod9','precio':350,thumbnail:'https://randomwordgenerator.com/img/picture-generator/53e5dd45495aa914f1dc8460962e33791c3ad6e04e507749742d7cd79e4cc0_640.jpg'})
db.productos.insertOne({title:'prod10','precio':575,thumbnail:'https://randomwordgenerator.com/img/picture-generator/54e5d04a4951ad14f1dc8460962e33791c3ad6e04e507440772d73d1974ec4_640.jpg'})

db.mensajes.drop()
db.createCollection("mensajes")
db.mensajes.insertOne({autor:'ignacio@sietepm.com.ar',mensaje:'prueba de mensaje 1',fecha:'2022-07-07 10:00'})
db.mensajes.insertOne({autor:'juan@sietepm.com.ar',mensaje:'prueba de mensaje 2',fecha:'2022-07-07 11:00'})
db.mensajes.insertOne({autor:'carlos@sietepm.com.ar',mensaje:'prueba de mensaje 3',fecha:'2022-07-07 12:00'})
db.mensajes.insertOne({autor:'pedro@sietepm.com.ar',mensaje:'prueba de mensaje 4',fecha:'2022-07-07 13:00'})
db.mensajes.insertOne({autor:'martin@sietepm.com.ar',mensaje:'prueba de mensaje 5',fecha:'2022-07-07 14:00'})
db.mensajes.insertOne({autor:'manuela@sietepm.com.ar',mensaje:'prueba de mensaje 6',fecha:'2022-07-07 15:00'})
db.mensajes.insertOne({autor:'carlos@sietepm.com.ar',mensaje:'prueba de mensaje 7',fecha:'2022-07-07 16:00'})
db.mensajes.insertOne({autor:'carolina@sietepm.com.ar',mensaje:'prueba de mensaje 8',fecha:'2022-07-07 17:00'})
db.mensajes.insertOne({autor:'ignacio@sietepm.com.ar',mensaje:'prueba de mensaje 9',fecha:'2022-07-07 18:00'})
db.mensajes.insertOne({autor:'miriam@sietepm.com.ar',mensaje:'prueba de mensaje 10',fecha:'2022-07-07 19:00'})

print("mensajes")
printjson(db.mensajes.find().pretty())
print("Cantidad de documentos mensajes "+db.mensajes.estimatedDocumentCount())

print("productos")
printjson(db.productos.find().pretty())
print("Cantidad de documentos productos "+db.productos.estimatedDocumentCount())

db.productos.insertOne({title:'prod11','precio':4575,thumbnail:'https://randomwordgenerator.com/img/picture-generator/54e5d04a4951ad14f1dc8460962e33791c3ad6e04e507440772d73d1974ec4_640.jpg'})

printjson(db.productos.find({title:'prod5'}));
printjson(db.productos.find({title:'prod5'}));
printjson(db.productos.find({precio:{$lt:1000}}));
printjson(db.productos.find({precio:{$gt:1000,$lt:3000}}))
printjson(db.productos.find({precio:{$gt:3000}}))
db.productos.updateMany({},{$set:{stock:100}});
db.productos.updateMany({precio:{$gt:4000}},{$set:{stock:0}});
db.productos.deleteMany({precio:{$lt:1000}});
printjson(db.productos.find().pretty())


db.createUser({
    user:'pepe',
    pwd:'asd456',
    roles:[
        {role:'read',db:'ecommerce'}
    ]
})

db.auth("pepe",'asd456')
db.productos.insertOne({title:'prod12','precio':575,thumbnail:'https://randomwordgenerator.com/img/picture-generator/54e5d04a4951ad14f1dc8460962e33791c3ad6e04e507440772d73d1974ec4_640.jpg'})
