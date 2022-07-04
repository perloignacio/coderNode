const {options}=require('./conexionSql');
const knex=require('knex')(options);

knex.schema.createTable('mensajes',table=>{
    table.increments('id'),
    table.string('autor',255).notNullable(),
    table.text('mensaje').notNullable(),
    table.string('fecha',255).notNullable()
}).then(()=>{
    console.log("Tabla creada");
}).catch((err)=>{
    console.log(err);
}).finally(()=>{
    knex.destroy();
})