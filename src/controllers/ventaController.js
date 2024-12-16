const Venta = require('../models/entity/venta.js'); // Ajusta la ruta según tu estructura
const DetalleVenta = require('../models/entity/detalleventa.js');
const { Carrito, DetalleCarrito, Producto } = require('../models/models.js');  // models.js


async function registrarVenta(req, res) {
  const userId = req.user.userId; // ID del usuario autenticado extraído del token

  try {
    // Buscar el carrito activo del usuario con los detalles y productos
    const carrito = await Carrito.findOne({
      where: { id_usuario: userId, estado: 'activo' },
      include: [
        {
          model: DetalleCarrito,
          as: 'detalles',
          include: [
            {
              model: Producto,
              as: 'producto',
            },
          ],
        },
      ],
    });

    if (!carrito) {
      return res.status(404).json({ message: 'No se encontró un carrito activo para este usuario.' });
    }

    // Calcular el total de la venta de forma directa
    const total = carrito.detalles.reduce((acc, detalle) => 
      acc + detalle.cantidad * parseFloat(detalle.producto.precio), 0);

    // Crear la venta con el total calculado
    const venta = await Venta.create({
      id_usuario: userId,
      total,
    });

    // Registrar los detalles de la venta
    const detallesVenta = carrito.detalles.map(detalle => ({
      id_venta: venta.id,
      id_producto: detalle.id_producto,
      cantidad: detalle.cantidad,
      precio_unitario: parseFloat(detalle.producto.precio),
    }));

    // Crear los detalles de la venta en la base de datos
    await DetalleVenta.bulkCreate(detallesVenta);

    // Eliminar los productos del carrito (DetalleCarrito) una vez finalizado
    await DetalleCarrito.destroy({
      where: { id_carrito: carrito.id },
    });

    return res.status(201).json({
      message: 'Venta registrada exitosamente y carrito vaciado.',
      venta,
      detallesVenta,
    });
  } catch (err) {
    console.error('Error al registrar la venta:', err);
    return res.status(500).json({ error: 'Error al registrar la venta', details: err.message });
  }
}


async function obtenerVentasUsuario(req, res) {
  const userId = req.user.userId; // ID del usuario autenticado extraído del token

  try {
    // Obtener las ventas del usuario con los detalles de cada venta
    const ventas = await Venta.findAll({
      where: { id_usuario: userId },
      include: [
        {
          model: DetalleVenta,
          as: 'detalles',
          include: [
            {
              model: Producto,
              as: 'producto',
            },
          ],
        },
      ],
    });

    if (ventas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron ventas para este usuario.' });
    }

    return res.status(200).json({
      message: 'Ventas obtenidas exitosamente.',
      ventas,
    });
  } catch (err) {
    console.error('Error al obtener las ventas:', err);
    return res.status(500).json({ error: 'Error al obtener las ventas', details: err.message });
  }
}

module.exports = {
  registrarVenta,
  obtenerVentasUsuario
};
