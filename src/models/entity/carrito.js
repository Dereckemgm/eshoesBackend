const { DataTypes } = require('sequelize');
const sequelize = require('../../config/data/db'); // Ajusta la ruta según tu estructura
const Usuario = require('./usuario.js'); // Importa el modelo de Usuario

const Carrito = sequelize.define('Carrito', {
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
  estado: {
    type: DataTypes.ENUM('activo', 'finalizado'),
    defaultValue: 'activo',
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'carritos', // Nombre de la tabla en la base de datos
  timestamps: false, // Desactiva createdAt y updatedAt
});


module.exports = Carrito;
