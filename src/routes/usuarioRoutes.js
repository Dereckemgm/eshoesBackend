// src/routes/usuarioRoutes.js
const express = require('express');
const { obtenerUsuarios, crearUsuario } = require('../controllers/usuarioController.js'); // Importa el controlador
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/obtenerusuarios', obtenerUsuarios);

// Ruta para crear un nuevo usuario
router.post('/crearusuario', crearUsuario);

module.exports = router;
