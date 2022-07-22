const { schema } = require('normalizr');
const authorSchema = new schema.Entity('autores')
const messageSchema = new schema.Entity('mensajes', {
  autor: authorSchema,
},{idAttribute:'_id'})
const global = new schema.Entity('global', {
  messages: [messageSchema],
})

module.export=global;