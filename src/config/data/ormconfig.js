const { DataSource } = require('typeorm');
require('dotenv').config(); // Cargar las variables de entorno desde .env

// Crear y exportar la configuración de TypeORM usando las variables de entorno
const AppDataSource = new DataSource({
  type: 'mysql',  
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORDXD,  // Mantén el nombre de variable como está
  database: process.env.DB_NAME,
  synchronize: true,  // 'true' solo en desarrollo, en producción debe ser 'false'
  logging: false,
  // No es necesario SSL para MySQL en la mayoría de los casos, quítalo si no lo necesitas
  entities: ['src/models/entity/**/*.js'],  // Cambia la ruta según tu estructura
  migrations: ['src/migration/**/*.js'],  // Ubicación de las migraciones
  subscribers: ['src/subscriber/**/*.js'],  // Ubicación de los subscribers
});

module.exports = {
  AppDataSource,
};

