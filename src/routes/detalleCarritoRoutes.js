const express = require('express');
const {
  createDetalleCarrito,
  getDetallesCarrito,
  updateDetalleCarrito,
  deleteDetalleCarrito
} = require('../controllers/detalleCarritoController.js');
const authenticateToken = require('../middlewares/authMiddleWare.js');

const router = express.Router();

// Ruta para crear un detalle de carrito
router.post('/', authenticateToken, createDetalleCarrito);

// Ruta para obtener los detalles de un carrito específico
router.get('/:id_carrito', authenticateToken, getDetallesCarrito);

// Ruta para actualizar un detalle de carrito
router.put('/:id', authenticateToken, updateDetalleCarrito);

// Ruta para eliminar un detalle de carrito
router.delete('/:id', authenticateToken, deleteDetalleCarrito);

module.exports = router;
