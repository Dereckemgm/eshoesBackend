const DetalleCarrito = require('../models/entity/detallecarrito.js'); // Ajusta la ruta según tu estructura
const Carrito = require('../models/entity/carrito.js');
const Producto = require('../models/entity/producto.js');

// Crear un nuevo detalle en el carrito
async function createDetalleCarrito(req, res) {
  const { id_carrito, id_producto, cantidad } = req.body;

  try {
    // Verificar que el carrito existe
    const carrito = await Carrito.findByPk(id_carrito);
    if (!carrito) {
      return res.status(400).json({ error: 'El carrito no existe' });
    }

    // Verificar que el producto existe
    const producto = await Producto.findByPk(id_producto);
    if (!producto) {
      return res.status(400).json({ error: 'El producto no existe' });
    }

    // Crear el detalle del carrito
    const detalleCarrito = await DetalleCarrito.create({
      id_carrito,
      id_producto,
      cantidad,
    });

    return res.status(201).json({
      message: 'Detalle del carrito creado exitosamente',
      detalleCarrito,
    });
  } catch (err) {
    console.error('Error al crear el detalle del carrito:', err);
    return res.status(500).json({ error: 'Error al crear el detalle del carrito', details: err.message });
  }
}

// Obtener los detalles de un carrito específico
async function getDetallesCarrito(req, res) {
  const { id_carrito } = req.params;

  try {
    const detalles = await DetalleCarrito.findAll({
      where: { id_carrito },
      include: [
        {
          model: Producto,
          as: 'producto',
          attributes: ['id', 'nombre', 'precio'],
        },
      ],
    });

    if (detalles.length === 0) {
      return res.status(404).json({ message: 'No se encontraron detalles para este carrito' });
    }

    return res.status(200).json({
      message: 'Detalles del carrito obtenidos exitosamente',
      detalles,
    });
  } catch (err) {
    console.error('Error al obtener los detalles del carrito:', err);
    return res.status(500).json({ error: 'Error al obtener los detalles del carrito', details: err.message });
  }
}

async function updateDetalleCarrito(req, res) {
  const { id } = req.params; // id del detalle que se quiere actualizar
  const { id_producto, cantidad } = req.body; // El id_producto y cantidad se reciben en el cuerpo de la solicitud

  try {
    // Buscar el detalle del carrito utilizando el id_carrito (de la URL) y el id_producto (del cuerpo de la solicitud)
    const detalle = await DetalleCarrito.findOne({
      where: {
        id_carrito: id, // Usamos el id de carrito pasado en la URL
        id_producto: id_producto, // Usamos el id_producto pasado en el cuerpo de la solicitud
      },
    });

    if (!detalle) {
      return res.status(404).json({ message: 'Detalle del carrito no encontrado' });
    }

    // Actualizar la cantidad del producto dentro del detalle encontrado
    detalle.cantidad = cantidad;
    await detalle.save();

    return res.status(200).json({
      message: 'Detalle del carrito actualizado exitosamente',
      detalle,
    });
  } catch (err) {
    console.error('Error al actualizar el detalle del carrito:', err);
    return res.status(500).json({ error: 'Error al actualizar el detalle del carrito', details: err.message });
  }
}


// Eliminar un detalle del carrito
async function deleteDetalleCarrito(req, res) {
  const { id } = req.params;

  try {
    const detalle = await DetalleCarrito.findByPk(id);

    if (!detalle) {
      return res.status(404).json({ message: 'Detalle del carrito no encontrado' });
    }

    await detalle.destroy();

    return res.status(200).json({
      message: 'Detalle del carrito eliminado exitosamente',
    });
  } catch (err) {
    console.error('Error al eliminar el detalle del carrito:', err);
    return res.status(500).json({ error: 'Error al eliminar el detalle del carrito', details: err.message });
  }
}

module.exports = {
  createDetalleCarrito,
  getDetallesCarrito,
  updateDetalleCarrito,
  deleteDetalleCarrito
};