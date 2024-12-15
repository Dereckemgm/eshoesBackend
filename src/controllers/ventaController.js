// src/controllers/ventas/ventasController.js
const Ventas = require('../models/entity/venta.js'); // Importa el modelo

// Obtener todas las ventas
const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Ventas.findAll();
    return res.status(200).json({
      success: true,
      message: 'Ventas obtenidas exitosamente.',
      data: ventas
    });
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener las ventas.'
    });
  }
};

// Crear una nueva venta
const crearVenta = async (req, res) => {
  const { producto_id, cantidad, precio_unitario, total, fecha } = req.body;

  // Verificar que los campos requeridos estén presentes
  if (!producto_id || !cantidad || !precio_unitario || !total) {
    return res.status(400).json({
      success: false,
      message: 'Faltan datos requeridos: producto_id, cantidad, precio_unitario y total.'
    });
  }

  try {
    // Crear la nueva venta
    const nuevaVenta = await Ventas.create({
      producto_id,
      cantidad,
      precio_unitario,
      total,
      fecha: fecha || new Date() // Usa la fecha proporcionada o la fecha actual
    });

    return res.status(201).json({
      success: true,
      message: 'Venta creada exitosamente.',
      data: nuevaVenta
    });
  } catch (error) {
    console.error('Error al crear la venta:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear la venta.'
    });
  }
};

module.exports = { obtenerVentas, crearVenta };
