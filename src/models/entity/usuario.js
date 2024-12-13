const { DataTypes } = require('sequelize');
const sequelize = require('../../config/data/db');

const Usuarios = sequelize.define('Usuarios', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_completo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    numero_telefono: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ciudad: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    pais: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    codigo_postal: {
        type: DataTypes.STRING(20),
        allowNull: true
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuarios;
