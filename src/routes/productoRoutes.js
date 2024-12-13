// src/routes/userRoutes.js
const express = require('express');
const { crearProducto, obtenerProductos} = require('../controllers/productoController.js');  // Importa el controlador
const router = express.Router();

// Ruta para crear un usuario
router.post('/crearproducto', crearProducto);
router.get('/obtenerproductos', obtenerProductos);

module.exports = router;