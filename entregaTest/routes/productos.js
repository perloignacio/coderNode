const express = require("express");

const productosController = require("../controllers/productos");

const router = express.Router();

router.get("/", productosController.getProductos);
router.get("/:id", productosController.getOneProducto);
router.post("/", productosController.saveProductos);
router.put("/:id", productosController.updateProductos);
router.delete("/:id", productosController.deleteProductos);

module.exports = router;
