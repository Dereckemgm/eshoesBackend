// src/controllers/usuarios/usuarioController.js
const Usuarios = require('../models/entity/usuario.js'); // Importa el modelo

// Controladores para Usuarios
// Obtener usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll();
    return res.status(200).json({
      success: true,
      message: 'Usuarios obtenidos exitosamente.',
      data: usuarios
    });
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los usuarios.'
    });
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  const { nombre_completo, correo_electronico, contrasena } = req.body;

  // Verificar que los campos requeridos estén presentes
  if (!nombre_completo || !correo_electronico || !contrasena) {
    return res.status(400).json({
      success: false,
      message: 'Faltan datos requeridos: nombre_completo, correo_electronico y contrasena.'
    });
  }

  try {
    // Crear el nuevo usuario
    const nuevoUsuario = await Usuarios.create({
      nombre_completo,
      correo_electronico,
      contrasena,
      numero_telefono: req.body.numero_telefono || null, // Campos opcionales
      direccion: req.body.direccion || null,
      ciudad: req.body.ciudad || null,
      pais: req.body.pais || null,
      codigo_postal: req.body.codigo_postal || null
    });

    return res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente.',
      data: nuevoUsuario
    });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear el usuario.'
    });
  }
};

module.exports = { obtenerUsuarios, crearUsuario };
