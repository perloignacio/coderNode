const { normalize, denormalize, schema } = require('normalizr');
const util = require('util')
function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true))
}

//const Normalizador = require('./model/normalizador');

let messages=[
  {
      "autor": {
          "id": "pablo@gmail.com",
          "nombre": "Pablo",
          "apellido": "Sangenis",
          "edad": 54,
          "alias": "pas",
          "avatar": "url_del_avatar"
      },
      "_id": "62cdefcc6eece9a08404dbfa",
      "mensaje": "Hola a todos...",
      "fecha": "2022-07-12T22:03:56.379Z",
      "__v": 0
  },
  {
      "autor": {
          "id": "pablo@gmail.com",
          "nombre": "Pablo",
          "apellido": "Sangenis",
          "edad": 54,
          "alias": "pas",
          "avatar": "url_del_avatar"
      },
      "_id": "62cdefd96eece9a08404dbfd",
      "mensaje": "como andan ?",
      "fecha": "2022-07-12T22:04:09.826Z",
      "__v": 0
  },
  {
      "autor": {
          "id": "pablo@gmail.com",
          "nombre": "Pablo",
          "apellido": "Sangenis",
          "edad": 54,
          "alias": "pas",
          "avatar": "url_del_avatar"
      },
      "_id": "62cdf02cb0bd42588147bbdc",
      "mensaje": "che que saben de coquito ??",
      "fecha": "2022-07-12T22:05:32.342Z",
      "__v": 0
  },
  {
      "autor": {
          "id": "pablo@gmail.com",
          "nombre": "Pablo",
          "apellido": "Sangenis",
          "edad": 54,
          "alias": "pas",
          "avatar": "url_del_avatar"
      },
      "_id": "62cdf039b0bd42588147bbdf",
      "mensaje": "Estaba preocupado por todos asi qe no quise preguntar",
      "fecha": "2022-07-12T22:05:45.375Z",
      "__v": 0
  },
  {
      "autor": {
          "id": "yessy@gmail.com",
          "nombre": "Yessy",
          "apellido": "Blazquez",
          "edad": 54,
          "alias": "yessyb",
          "avatar": "url_del_avatar de yessy"
      },
      "_id": "62cdf07bb0bd42588147bbe4",
      "mensaje": "Holaaaaa",
      "fecha": "2022-07-12T22:06:51.624Z",
      "__v": 0
  },
  {
      "autor": {
          "id": "yessy@gmail.com",
          "nombre": "Yessy",
          "apellido": "Blazquez",
          "edad": 54,
          "alias": "yessyb",
          "avatar": "url_del_avatar de yessy"
      },
      "_id": "62cdf080b0bd42588147bbe7",
      "mensaje": "no sabia nada yo cheee",
      "fecha": "2022-07-12T22:06:56.369Z",
      "__v": 0
  },
  {
      "autor": {
          "id": "yessy@gmail.com",
          "nombre": "Yessy",
          "apellido": "Blazquez",
          "edad": 54,
          "alias": "yessyb",
          "avatar": "url_del_avatar de yessy"
      },
      "_id": "62cdf098b0bd42588147bbea",
      "mensaje": "Tratemos de hacer una vaquita asi le pagamos lo que gasto",
      "fecha": "2022-07-12T22:07:20.342Z",
      "__v": 0
  },
  {
      "autor": {
          "id": "pablo@gmail.com",
          "nombre": "Pablo",
          "apellido": "Sangenis",
          "edad": 54,
          "alias": "pas",
          "avatar": "url_del_avatar"
      },
      "_id": "62cdf0a0b0bd42588147bbed",
      "mensaje": "mmm, no sera mucho che ?",
      "fecha": "2022-07-12T22:07:28.172Z",
      "__v": 0
  }
]

//Para el tipico objeto de mongo
const authorSchema = new schema.Entity('autores')
const messageSchema = new schema.Entity('mensajes', {
  autor: authorSchema,
},{idAttribute:'_id'})
const global = new schema.Entity('global', {
  messages: [messageSchema],
})

const data = { id: 'mensajes', messages }

//console.log('Objeto Normalizado')
const dataNormalized = normalize(data, global)
//print(dataNormalized);

//console.log('Objeto Desnormalizado')
const dataDeNormalized = denormalize(dataNormalized.result, global, dataNormalized.entities)
//print(dataDeNormalized)

console.log('Long original: ', JSON.stringify(global).length)
console.log('Long normalizado: ', JSON.stringify(dataNormalized).length)
console.log('Long denormalizado: ', JSON.stringify(dataDeNormalized).length)