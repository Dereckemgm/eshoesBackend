// src/routes/userRoutes.js
const express = require('express');
const { crearProducto, obtenerProductos, obtenerProductoPorNombre } = require('../controllers/productoController.js');

const router = express.Router();

// Ruta para crear un usuario
router.post('/crearproducto', crearProducto);
router.get('/obtenerproductos', obtenerProductos);
router.get('/obtenerproducto/:nombre', obtenerProductoPorNombre); // Nueva ruta para filtrar


module.exports = router;