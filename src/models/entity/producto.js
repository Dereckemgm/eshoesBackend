const { DataTypes } = require('sequelize');
const sequelize = require('../../config/data/db');

const Productos = sequelize.define('Productos', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    imagen_url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'productos',
    timestamps: false
  });
  
  module.exports = Productos;