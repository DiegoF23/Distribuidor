const express = require("express");
const router = express.Router();
const lotesController = require("../controllers/lotesControllers");

// Obtener los lotes de una sucursal (por ejemplo, GET /api/lotes/1)
router.get("/lotes/:id_sucursal", lotesController.obtenerLotesPorSucursal);

// Crear un nuevo lote (POST /api/lotes)
router.post("/lotes", lotesController.crearLote);

module.exports = router;
