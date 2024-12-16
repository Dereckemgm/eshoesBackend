const { DataTypes } = require('sequelize');
const sequelize = require('../../config/data/db'); // Ajusta la ruta según tu estructura

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'productos', // Nombre de la tabla en la base de datos
  timestamps: false, // Desactiva createdAt y updatedAt
});

module.exports = Producto;
