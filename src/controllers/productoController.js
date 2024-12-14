// src/controllers/reservas/usuarioController.js
const Productos = require('../models/entity/producto.js'); // Importa el modelo

// Controladores para Productos
// Obtener productos
const obtenerProductos = async (req, res) => {
    try {
      const productos = await Productos.findAll();
      return res.status(200).json({
        success: true,
        message: 'Productos obtenidos exitosamente.',
        data: productos
      });
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los productos.'
      });
    }
  };

  const obtenerProductoPorNombre = async (req, res) => {
    const { nombre } = req.params;
  
    try {
      const producto = await Productos.findOne({ where: { nombre } });
  
      if (!producto) {
        return res.status(404).json({
          success: false,
          message: `Producto con el nombre "${nombre}" no encontrado.`,
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Producto encontrado exitosamente.',
        data: producto,
      });
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el producto.',
      });
    }
  };
  

  const crearProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock, imagen_url } = req.body;

  if (!nombre || !precio || !stock) {
    return res.status(400).json({
      success: false,
      message: 'Faltan datos requeridos: nombre, precio y stock.'
    });
  }

  try {
    const nuevoProducto = await Productos.create({
      nombre,
      descripcion,
      precio,
      stock,
      imagen_url
    });

    return res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente.',
      data: nuevoProducto
    });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear el producto.'
    });
  }
};

