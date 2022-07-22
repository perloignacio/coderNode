const containerMongo =require('../containers/containerMongo');
const mensajesSchema=require("./modelSchemas/mensajesSchema");
const { faker } =require('@faker-js/faker');

faker.locale = 'es';
 class mensajes extends containerMongo{
    
    constructor(){
        
        super(mensajesSchema)
    }
    guardar(data){
        data.autor.nombre=faker.name.firstName();
		data.autor.apellido=faker.name.lastName();
		data.autor.edad=faker.datatype.number(100);
		data.autor.alias=faker.name.middleName();
		data.autor.avatar=faker.image.people(1234, 2345, true)
        this.insert(data);
    }
}
module.exports=mensajes;