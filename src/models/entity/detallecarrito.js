// DetalleCarrito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/data/db');
const Carrito = require('./carrito.js'); // Importa el modelo Carrito
const Producto = require('./producto.js'); // Importa el modelo Producto

const DetalleCarrito = sequelize.define('DetalleCarrito', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_carrito: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Carrito, // Define la relación con el modelo Carrito
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
      min: 1, // Asegura que la cantidad sea mayor a 0
    },
  },
}, {
  tableName: 'detalles_carrito', // Nombre de la tabla en la base de datos
  timestamps: false, // Desactiva createdAt y updatedAt
});

// Relaciones con Carrito y Producto
DetalleCarrito.belongsTo(Carrito, {
  foreignKey: 'id_carrito',
  as: 'carrito',
});

DetalleCarrito.belongsTo(Producto, {
  foreignKey: 'id_producto',
  as: 'producto',
});


module.exports = DetalleCarrito;
