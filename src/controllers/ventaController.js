const venta = require('../models/entity/venta.js'); // Importa el modelo


// Registrar una venta
const realizarVenta = async (req, res) => {
  const { productoId, cantidad } = req.body;

  // Validar datos de entrada
  if (!productoId || !cantidad || typeof cantidad !== 'number' || cantidad <= 0) {
    return res.status(400).json({ error: 'Datos de entrada inválidos' });
  }

  const connection = await pool.getConnection(); // Usar conexión para transacción
  try {
    // Iniciar transacción
    await connection.beginTransaction();

    // 1. Verificar que el producto exista
    const [producto] = await connection.query('SELECT * FROM productos WHERE id = ?', [productoId]);
    if (producto.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // 2. Verificar que haya suficiente stock
    if (producto[0].stock < cantidad) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }

    // 3. Calcular el total de la venta
    const precioUnitario = producto[0].precio;
    const total = cantidad * precioUnitario;

    // 4. Registrar la venta en la tabla `ventas`
    await connection.query(
      'INSERT INTO ventas (producto_id, cantidad, precio_unitario, total) VALUES (?, ?, ?, ?)',
      [productoId, cantidad, precioUnitario, total]
    );

    // 5. Reducir el stock del producto
    await connection.query('UPDATE productos SET stock = stock - ? WHERE id = ?', [cantidad, productoId]);

    // Confirmar transacción
    await connection.commit();

    res.json({ message: 'Venta realizada con éxito', total });
  } catch (err) {
    // Revertir transacción si hay un error
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: 'Error al realizar la venta', detalle: err.message });
  } finally {
    connection.release(); // Liberar la conexión
  }
};

// Obtener todas las ventas
const obtenerVentas = async (req, res) => {
  try {
    // Utilizando Sequelize para obtener ventas con la relación de productos
    const ventas = await Venta.findAll({
      include: {
        model: Producto,
        as: 'producto',
        attributes: ['nombre'] // Solo incluimos el nombre del producto
      }
    });

    // Retornamos la respuesta con la estructura estándar
    return res.status(200).json({
      success: true,
      message: 'Ventas obtenidas exitosamente.',
      data: ventas
    });
  } catch (error) {
    console.error('Error al obtener las ventas:', error);

    // Respuesta en caso de error
    return res.status(500).json({
      success: false,
      message: 'Error al obtener las ventas.',
      detalle: error.message
    });
  }
};

module.exports = {
  realizarVenta,
  obtenerVentas,
};
