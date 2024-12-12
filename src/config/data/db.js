const { Sequelize } = require('sequelize'); // Asegúrate de que estás importando Sequelize
require('dotenv').config(); // Cargar las variables de entorno desde .env

// Crear una nueva instancia de Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORDXD, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // Asegúrate de especificar el dialecto aquí
  port: process.env.DB_PORT, // O puedes poner el puerto directamente si es necesario
});

module.exports = sequelize;
