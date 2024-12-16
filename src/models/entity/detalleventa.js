// DetalleVenta.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/data/db');
const Producto = require('./producto.js'); // Importa Producto correctamente

const DetalleVenta = sequelize.define('DetalleVenta', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_venta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Venta', // Cambiar a string para evitar importar el modelo aquí
      key: 'id',
    },
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Producto, // Define la relación con el modelo Producto
      key: 'id',
    },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'detalles_venta',
  timestamps: false,
});

module.exports = DetalleVenta;
