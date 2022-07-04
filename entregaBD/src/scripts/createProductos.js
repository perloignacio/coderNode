const {options}=require('./conexionMaria');
const knex=require('knex')(options);

knex.schema.createTable('productos',table=>{
    table.increments('id'),
    table.string('nombre',255).notNullable(),
    table.decimal('precio',10,2).notNullable(),
    table.string('thumbnail',500).notNullable()
}).then(()=>{
    console.log("Tabla creada");
}).catch((err)=>{
    console.log(err);
}).finally(()=>{
    knex.destroy();
})