# Servidor REST con patron DAO/DTO/Factory

##  con ExpressJS + Sqlite con Sequelize + MongoDB (local) con Mongoose + Persistencia en JSON

### Para instalar los paquetes necesarios usar:

``` npm install ```

### Para usar en local ejecutar:

``` npm run dev ``` or ``` npm start ```
### En el .env se debe cambiar la variable PERSISTENCE por SQLITE, JSON o MONGO y luego arrancar el servidor

### Para probar, usar postman o cualquier otro cliente de apis de la siguiente:

get localhost:PORT/users
post localhost:PORT/users y mandar el objeto 

{
    "email": "usuario1@gmail.ar",
    "username": "usuario1",
    "password": "12345"
}