const express = require('express');
const {
  createCarrito,
  getCarritosByUser,
  updateCarrito,
  deleteCarrito
} = require('../controllers/carritoController.js');
const authenticateToken = require('../middlewares/authMiddleWare.js');

const router = express.Router();

// Asegúrate de que las rutas se registran correctamente
router.post('/', authenticateToken, createCarrito);  // Crear carrito
router.get('/', authenticateToken, getCarritosByUser);  // Obtener carritos de un usuario
router.put('/:id', authenticateToken, updateCarrito);  // Actualizar carrito
router.delete('/:id', authenticateToken, deleteCarrito);  // Eliminar carrito

module.exports = router;
