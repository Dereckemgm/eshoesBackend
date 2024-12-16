const Usuario = require('../../models/entity/usuario'); // Asegúrate de que la ruta sea correcta

// Función para obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    // Obtener todos los usuarios en la base de datos
    const usuarios = await Usuario.findAll(); // Usamos `findAll` de Sequelize para obtener todos los usuarios

    // Respuesta exitosa con los usuarios
    return res.status(200).json({
      success: true,
      message: 'Usuarios obtenidos exitosamente.',
      data: usuarios,
    });
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los usuarios.',
    });
  }
};

// Función para crear un nuevo usuario
const crearUsuario = async (req, res) => {
  const { nombre_completo, correo_electronico, contrasena, numero_telefono, direccion, ciudad, pais, codigo_postal } = req.body;

  // Validación básica para asegurar que los campos requeridos estén presentes
  if (!nombre_completo || !correo_electronico || !contrasena) {
    return res.status(400).json({
      success: false,
      message: 'Faltan datos requeridos: nombre_completo, correo_electronico y contrasena.',
    });
  }

  try {
    // Verificar si el correo electrónico ya está registrado
    const usuarioExistente = await Usuario.findOne({ where: { correo_electronico } });
    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        message: 'El correo electrónico ya está registrado.',
      });
    }

    // Crear un nuevo usuario en la base de datos
    const nuevoUsuario = await Usuario.create({
      nombre_completo,
      correo_electronico,
      contrasena,
      numero_telefono,
      direccion,
      ciudad,
      pais,
      codigo_postal,
    });

    // Respuesta exitosa
    return res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente.',
      data: nuevoUsuario, // Puedes incluir el nuevo usuario creado
    });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al guardar el usuario.',
    });
  }
};

// Función para obtener un usuario por su ID
const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el usuario por su ID
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado.',
      });
    }

    // Respuesta exitosa con los datos del usuario
    return res.status(200).json({
      success: true,
      message: 'Usuario encontrado.',
      data: usuario,
    });
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el usuario.',
    });
  }
};

module.exports = { obtenerUsuarios, crearUsuario, obtenerUsuarioPorId };
