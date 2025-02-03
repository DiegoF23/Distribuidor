const express = require('express');
const router = express.Router();
const SociosController = require('../controllers/sociosController');


router.get('/socios', SociosController.getSocios);
router.get('/socios/:id', SociosController.getSocioById);
router.post('/socios', SociosController.createSocio);
router.put('/socios/:id', SociosController.updateSocio);
router.delete('/socios/:id', SociosController.deleteSocio);

module.exports = router;