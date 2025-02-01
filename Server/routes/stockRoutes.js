const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

// Ruta para obtener el stock de una sucursal
router.get("/stock/:id_sucursal", stockController.obtenerStockSucursal);

module.exports = router;    