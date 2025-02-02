// routes/loteConfiguracionesRoutes.js
const express = require("express");
const router = express.Router();
const loteConfiguracionesController = require("../controllers/loteConfiguracionesController");

// Ruta para obtener todas las configuraciones de lote
router.get("/lote_configuraciones", loteConfiguracionesController.obtenerConfiguraciones);

module.exports = router;
