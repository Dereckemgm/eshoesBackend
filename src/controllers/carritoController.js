const Carrito = require('../models/entity/carrito.js'); // Ajusta la ruta según tu estructura
const Usuario = require('../models/entity/usuario.js'); // Ajusta la ruta según tu estructura
const DetalleCarrito = require('../models/entity/detallecarrito.js'); // Importa el modelo de DetalleCarrito
const Producto = require('../models/entity/producto.js'); // Asegúrate de que exista el modelo Producto

// Crear un nuevo carrito y su detalle asociado
async function createCarrito(req, res) {
    const { estado, id_producto, cantidad } = req.body; // Datos necesarios para carrito y detalle
    const userId = req.user.userId;  // ID del usuario autenticado
  
    try {
      // Verificar que el usuario exista
      const usuario = await Usuario.findByPk(userId);
      if (!usuario) {
        return res.status(400).json({ error: 'Usuario no encontrado' });
      }
  
      // Verificar que el producto exista
      const producto = await Producto.findByPk(id_producto);
      if (!producto) {
        return res.status(400).json({ error: 'Producto no encontrado' });
      }
  
      // Crear el carrito
      const carrito = await Carrito.create({
        id_usuario: userId,  // Asociamos el carrito con el usuario autenticado
        estado: estado || 'activo',  // Si no se especifica el estado, se asigna 'activo'
      });
  
      // Crear el detalle del carrito con el producto enviado
      const detalleCarrito = await DetalleCarrito.create({
        id_carrito: carrito.id,
        id_producto,
        cantidad: cantidad || 1, // Si no se especifica cantidad, se asigna 1
      });
  
      return res.status(201).json({
        message: 'Carrito y detalle creado exitosamente',
        carrito,
        detalleCarrito,
      });
    } catch (err) {
      console.error('Error al crear el carrito y detalle:', err);
      return res.status(500).json({ error: 'Error al crear el carrito y detalle', details: err.message });
    }
  }

// Obtener todos los carritos de un usuario autenticado
async function getCarritosByUser(req, res) {
    const userId = req.user.userId;  // ID del usuario autenticado
  
    try {
      console.log('User ID:', userId); // Verifica si el ID del usuario es correcto
      const carritos = await Carrito.findAll({
        where: { id_usuario: userId },
        include: [{
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre_completo', 'correo_electronico'],
        }],
      });
  
      if (carritos.length === 0) {
        return res.status(404).json({ message: 'No se encontraron carritos para este usuario' });
      }
  
      return res.status(200).json({
        message: 'Carritos obtenidos exitosamente',
        carritos,
      });
    } catch (err) {
      console.error('Error al obtener los carritos:', err);
      return res.status(500).json({ error: 'Error al obtener los carritos', details: err.message });
    }
  }
  

// Obtener un carrito por ID del usuario autenticado
async function getCarritoById(req, res) {
  const { id } = req.params;
  const userId = req.user.userId;  // ID del usuario autenticado

  try {
    const carrito = await Carrito.findOne({
      where: { id, id_usuario: userId },  // Aseguramos que el carrito pertenece al usuario autenticado
      include: [{
        model: Usuario,
        as: 'usuario',
        attributes: ['id', 'nombre_completo', 'correo_electronico'],
      }],
    });

    if (!carrito) {
      return res.status(404).json({ message: 'Carrito no encontrado o no pertenece al usuario autenticado' });
    }

    return res.status(200).json({
      message: 'Carrito obtenido exitosamente',
      carrito,
    });
  } catch (err) {
    console.error('Error al obtener el carrito:', err);
    return res.status(500).json({ error: 'Error al obtener el carrito', details: err.message });
  }
}

    // Actualizar el estado de un carrito del usuario autenticado
    async function updateCarrito(req, res) {
    const { id } = req.params;
    const { estado } = req.body;
    const userId = req.user.userId;  // ID del usuario autenticado

    try {
        const carrito = await Carrito.findOne({
        where: { id, id_usuario: userId },  // Aseguramos que el carrito pertenece al usuario autenticado
        });

        if (!carrito) {
        return res.status(404).json({ message: 'Carrito no encontrado o no pertenece al usuario autenticado' });
        }

        // Actualizar el carrito
        carrito.estado = estado;
        await carrito.save();

        return res.status(200).json({
        message: 'Carrito actualizado exitosamente',
        carrito,
        });
    } catch (err) {
        console.error('Error al actualizar el carrito:', err);
        return res.status(500).json({ error: 'Error al actualizar el carrito', details: err.message });
    }
    }

// Eliminar un carrito del usuario autenticado
async function deleteCarrito(req, res) {
  const { id } = req.params;
  const userId = req.user.userId;  // ID del usuario autenticado

  try {
    const carrito = await Carrito.findOne({
      where: { id, id_usuario: userId },  // Aseguramos que el carrito pertenece al usuario autenticado
    });

    if (!carrito) {
      return res.status(404).json({ message: 'Carrito no encontrado o no pertenece al usuario autenticado' });
    }

    // Eliminar el carrito
    await carrito.destroy();

    return res.status(200).json({
      message: 'Carrito eliminado exitosamente',
    });
  } catch (err) {
    console.error('Error al eliminar el carrito:', err);
    return res.status(500).json({ error: 'Error al eliminar el carrito', details: err.message });
  }
}

module.exports = {
  createCarrito,
  getCarritosByUser,
  getCarritoById,
  updateCarrito,
  deleteCarrito
};
