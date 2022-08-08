const ProductosMongo = require("../models/productosMongo");

class Productos {
  constructor() {
    this.model = ProductosMongo;
  }
  getAll = async () => {
    return await this.model.find();
  };
  getOne = async (id) => {
    return await this.model.findOne({ _id: id });
  };
  save = async (prod) => {
    return await this.model.create(prod);
  };
  update = async (id,prod) => {
    return await this.model.findOneAndUpdate({ _id: id },prod);
  };
  delete = async (id) => {
    return await this.model.deleteOne({_id:id});
  };
}

module.exports = Productos;
