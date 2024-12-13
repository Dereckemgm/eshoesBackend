const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/data/db'); // Conexión a la base de datos
const productoRoutes = require('./src/routes/productoRoutes');  // Rutas de productos
const usuarioRoutes = require('./src/routes/usuarioRoutes');  // Rutas de usuario
const app = express();
const PORT = process.env.PORT || 3000;
const serverurl = process.env.URL_RENDER || 'http://localhost';

// Configuración de CORS y JSON middleware
app.use(cors());
app.use(express.json());

// Registrar las rutas
app.use('/productos', productoRoutes);
app.use('/usuarios', usuarioRoutes);


sequelize.sync({ force: false }) // Usa `force: true` para sobrescribir tablas existentes si necesitas
  .then(() => {
    console.log('Tablas sincronizadas.');

    // Inicia el servidor después de que las tablas se hayan sincronizado
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch(err => console.error('Error sincronizando tablas:', err));