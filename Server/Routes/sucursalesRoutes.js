const express = require('express');
const router = express.Router();
const SucursalesController = require('../controllers/sucursalesController');

// Rutas para Sucursales
router.get('/sucursales', SucursalesController.getSucursales);
router.get('/sucursales/:id', SucursalesController.getSucursalById);
router.post('/sucursales', SucursalesController.createSucursal);
router.put('/sucursales/:id', SucursalesController.updateSucursal);
router.delete('/sucursales/:id', SucursalesController.deleteSucursal);

module.exports = router;
