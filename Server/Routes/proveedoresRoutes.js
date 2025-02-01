const express = require('express');
const router = express.Router();
const ProveedoresController = require('../controllers/proveedoresControllers');
//const authController = require('../controllers/authController');

// Rutas para Proveedores
router.get('/proveedores', ProveedoresController.getProveedores);
router.post('/proveedores', ProveedoresController.createProveedor);
router.put('/proveedores/:id', ProveedoresController.updateProveedor);
router.delete('/proveedores/:id', ProveedoresController.deleteProveedor);

module.exports = router;