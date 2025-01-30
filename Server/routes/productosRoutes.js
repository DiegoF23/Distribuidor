const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");

// Ruta para obtener todos los productos
router.get("/productos", productosController.obtenerProductos);
// Ruta para crear un nuevo producto
router.post("/productos", productosController.crearProducto);
// Ruta para editar un producto
router.put("/productos/:id_producto", productosController.editarProducto);

// Ruta para eliminar un producto
router.delete("/productos/:id_producto", productosController.eliminarProducto);

module.exports = router;