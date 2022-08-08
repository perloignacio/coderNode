const PersistenceFactory = require("../dao/persistenceFactory");

class productosService {
  constructor() {
    this.productosDao;
    this.init();
  }
  init = async () => {
    this.productosDao = await PersistenceFactory.getPersistence();
  };
  getProductos = async () => {
    return await this.productosDao.getAll();
  };
  getOne= async (idprod) => {
    return await this.productosDao.getOne(idprod);
  };
  addProducto = async (prod) => {
    return await this.productosDao.save(prod);
  };
  updateProducto = async (id,prod) => {
    return await this.productosDao.update(id,prod);
  };
  deleteProducto = async (id) => {
    return await this.productosDao.delete(id);
  };
}

module.exports = productosService;
