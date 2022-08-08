const assert =require('node:assert')
const chai =require('chai')
const chaiHttp =require('chai-http')
let should = chai.should();
chai.use(chaiHttp);

const url= 'http://localhost:3000';

const data = {
    "nombre":"test",
    "descripcion":"prueba de axios",
    "codigo":"test123",
    "precio":500,
    "stock":10,
    "foto":"https://www.servethome.com.ar/api/assets/Productos/0_20220801065546.jpg"
}

const dataUpdate = {
    "nombre":"test Modificado",
    "descripcion":"prueba de axios",
    "codigo":"test123",
    "precio":500,
    "stock":10,
    "foto":"https://www.servethome.com.ar/api/assets/Productos/0_20220801065546.jpg"
}

let cantidadProductos = 0;
let idprod = "";

describe('Estado y tipo de respuesta',() => {
    it('Debería devolver un estado 200 al pedir ', (done) => {
        chai.request(url)
        .get('/productos')
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            cantidadProductos = res.body.length
            done();
        });
    });
    
    it('Debería esperar un array de productos', (done) => {
        chai.request(url)
        .get('/productos')
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            
            assert.strictEqual(res.body.length, cantidadProductos)
            done();
        });
    });
    
});


describe('Insertar producto',() => {
    it('Debería poder insertar un producto obtener un objeto', (done) => {
        chai.request(url)
        .post('/productos')
        .send(data)
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            idprod = res.body.id
            cantidadProductos++;
            done();
        });
    });

    it('La cantidad de productos devueltos en el array deberia de ser igual a la cantidad de productos testeado', (done) => {
        chai.request(url)
        .get('/productos')
        .send(data)
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            assert.strictEqual(res.body.length, cantidadProductos)
            done();
        });
    });
    

});

describe('Modificación de producto',() => {
    it('Debería poder modificar un producto y ver el dato modificado', (done) => {
        chai.request(url)
        .put(`/productos/${idprod}`)
        .send(dataUpdate)
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.have.property('nombre').eql('test Modificado');
            done();
        });
    });
});

describe('Eliminación de producto',() => {
    it('Debería poder eliminar un producto', (done) => {
        chai.request(url)
        .delete(`/productos/${idprod}`)
        .end( (err,res) => {
            res.should.have.status(200);
            cantidadProductos--;
            done();
        });
    });
    it('Debería devolver la misma cantidad de productos que la indicada por el testing', (done) => {
        chai.request(url)
        .get('/productos')
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            assert.strictEqual(res.body.length, cantidadProductos)
            done();
        });
    });
});