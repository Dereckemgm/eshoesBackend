// models.js
const Venta = require('./entity/venta');
const DetalleVenta = require('./entity/detalleventa');
const Usuario = require('./entity/usuario');
const Carrito = require('./entity/carrito');
const DetalleCarrito = require('./entity/detallecarrito');
const Producto = require('./entity/producto');

// Establecer relaciones
Carrito.hasMany(DetalleCarrito, { foreignKey: 'id_carrito', as: 'detalles' });
DetalleCarrito.belongsTo(Carrito, { foreignKey: 'id_carrito' });
DetalleCarrito.belongsTo(Producto, { foreignKey: 'id_producto', as: 'productocarrito' });

// Relación de Venta y DetalleVenta con el alias 'detalles'
Venta.hasMany(DetalleVenta, { foreignKey: 'id_venta', as: 'detalles' });
DetalleVenta.belongsTo(Venta, { foreignKey: 'id_venta' });

// Relación entre Producto y DetalleVenta (asumimos que cada detalle de venta tiene un producto asociado)
DetalleVenta.belongsTo(Producto, { foreignKey: 'id_producto', as: 'producto' });

module.exports = { Carrito, DetalleCarrito, Venta, DetalleVenta, Producto, Usuario };
