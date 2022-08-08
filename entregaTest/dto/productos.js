class ProductosDTO {
  constructor(prod) {
    if(prod){
      this.id = prod._id;
      this.nombre = prod.nombre;
      this.descripcion=prod.descripcion;
      this.datos=[
        {
          codigo:prod.codigo,
          precio:prod.precio,
          stock:prod.stock
        }
      ],
      this.foto=prod.foto;
    }
    
  }
}

module.exports = ProductosDTO;
