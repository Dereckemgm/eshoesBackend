const express = require('express');
const router = express.Router();
const { registrarVenta, obtenerVentasUsuario } = require('../controllers/ventaController');
const authenticateToken = require('../middlewares/authMiddleWare');

// Ruta para registrar una venta
router.post('/registrar', authenticateToken, registrarVenta);

// Ruta para obtener las ventas del usuario autenticado
router.get('/', authenticateToken, obtenerVentasUsuario);

module.exports = router;
