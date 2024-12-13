const { DataTypes } = require('sequelize');
const sequelize = require('../../config/data/db');

const CantidadProducto = sequelize.define('CantidadProducto', {
    producto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    cantidad_producto: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'cantidadproducto',
    timestamps: false
  });

  module.exports = CantidadProducto;
  