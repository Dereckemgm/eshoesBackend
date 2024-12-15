const express = require('express');
const { realizarVenta, obtenerVentas} = require('../controllers/ventaController.js'); // Importa el controlador
const router = express.Router();

// Ruta para crear una nueva venta
router.post('/crearventa', realizarVenta);

// Ruta para obtener todas las ventas
router.get('/obtenerventas', obtenerVentas);


module.exports = router;
