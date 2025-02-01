const express = require('express');
const router = express.Router();
const ClientesController = require('../controllers/clientesControllers');

// Rutas para Clientes
router.get('/clientes', ClientesController.getClientes);
router.post('/clientes', ClientesController.createCliente);
router.put('/clientes/:id', ClientesController.updateCliente);
router.delete('/clientes/:id', ClientesController.deleteCliente);

module.exports = router;