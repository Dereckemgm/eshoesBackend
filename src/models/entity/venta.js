// Venta.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/data/db');
const Usuario = require('./usuario.js'); // Importa Usuario correctamente

const Venta = sequelize.define('Venta', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario, // Define la relación con el modelo Usuario
      key: 'id',
    },
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('now'),
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'ventas',
  timestamps: false,
});

module.exports = Venta;
