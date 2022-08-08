const productosService = require("../services/productos");
const ProductosDTO = require("../dto/productos");

const pservice = new productosService();

const getProductos = async (req, res) => {
  let result = await pservice.getProductos();
  let resultsDTO = result.map((prod) => new ProductosDTO(prod));
  res.send(resultsDTO);
};

const getOneProducto = async (req, res) => {
  
  let id=req.params.id;
  let result = await pservice.getOne(id);
  let resultsDTO = new ProductosDTO(result);
  res.send(resultsDTO);
};

const saveProductos = async (req, res) => {
  let prod = req.body;
  let result = await pservice.addProducto(prod);
  let resultsDTO = new ProductosDTO(result);
  res.send(resultsDTO);
  
};

const updateProductos = async (req, res) => {
  let prod = req.body;
  let id=req.params.id;
  await pservice.updateProducto(id,prod);
  let result=await pservice.getOne(id);
  let resultsDTO = new ProductosDTO(result);
  res.send(resultsDTO);
  
};

const deleteProductos = async (req, res) => {
 
  let id=req.params.id
  let result = await pservice.deleteProducto(id);
  let resultsDTO = new ProductosDTO(result);
  res.send(resultsDTO);
};

module.exports = {
  getProductos,
  saveProductos,
  updateProductos,
  deleteProductos,
  getOneProducto
};
