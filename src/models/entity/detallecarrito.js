const { DataTypes } = require('sequelize');
const sequelize = require('../../config/data/db');

// Modelo para DetalleCarrito
const DetalleCarrito = sequelize.define('DetalleCarrito', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  productocantidad_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'detallecarrito',
  timestamps: false
});

module.exports = DetalleCarrito;