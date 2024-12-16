const { DataTypes } = require('sequelize');
const sequelize = require('../../config/data/db'); // Ajusta la ruta según tu estructura

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_completo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  correo_electronico: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true, // Garantiza la unicidad
  },
  numero_telefono: {
    type: DataTypes.STRING(20),
    allowNull: true, // Permitido que sea NULL
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ciudad: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  pais: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  codigo_postal: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
}, {
  tableName: 'usuarios', // Nombre de la tabla en la base de datos
  timestamps: false, // Desactiva createdAt y updatedAt
});

module.exports = Usuario;
