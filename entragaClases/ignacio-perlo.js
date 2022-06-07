class usuario{
    constructor(nombre,apellido){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=[];
        this.mascotas=[];
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota(mascota){
        this.mascotas.push(mascota);
    }
    addBook(titulo,autor){
        this.libros.push({nombre:titulo,autor:autor});
    }
    getBookNames(){
        return this.libros.map(l=>l.nombre);
    }
    countMascotas(){
        return this.mascotas.length;
    }
}   

const juan=new usuario("Juan","Perez");
juan.addMascota("perro");
juan.addMascota("gato");
juan.addBook("Por quien doblan las campanas","Ernest Hemingway");
juan.addBook("100 años de soledad","Gabriel Garcia Marquez");
console.log(juan.getFullName());
console.log(juan.countMascotas());
console.log(juan.getBookNames());

const ignacio=new usuario("Manuela","Perlo");
ignacio.addMascota("perro");

ignacio.addBook("¡ÑAM!","Canizales");

console.log(ignacio.getFullName());
console.log(ignacio.countMascotas());
console.log(ignacio.getBookNames());