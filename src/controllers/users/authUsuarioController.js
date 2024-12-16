const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/entity/usuario'); // Asegúrate de que la ruta sea correcta

// Función para registrar un usuario
async function registerUser(req, res) {
  const { nombre_completo, correo_electronico, contrasena, numero_telefono, direccion, ciudad, pais, codigo_postal } = req.body;

  try {
    // Verificar si el correo electrónico ya está registrado
    const existingUser = await Usuario.findOne({ where: { correo_electronico } });

    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    // Hashear la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(contrasena, 10);  // 10 rondas de salting

    // Crear un nuevo usuario
    const user = await Usuario.create({
      nombre_completo,
      correo_electronico,
      contrasena: hashedPassword,
      numero_telefono,
      direccion,
      ciudad,
      pais,
      codigo_postal,
    });

    // Eliminar el campo contrasena antes de devolver el usuario
    const { contrasena: passwordHash, ...userWithoutPassword } = user.toJSON();

    // Responder al cliente con el usuario sin la contraseña
    res.status(201).json({ message: 'Usuario registrado correctamente', user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar el usuario', details: err });
  }
}

// Función para iniciar sesión
async function loginUser(req, res) {
  const { correo_electronico, contrasena } = req.body;

  try {
    // Buscar al usuario por correo electrónico
    const user = await Usuario.findOne({ where: { correo_electronico } });

    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Comparar la contraseña proporcionada con el hash almacenado
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);

    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Crear un token JWT
    const token = jwt.sign(
      { userId: user.id, correo_electronico: user.correo_electronico },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Eliminar el campo contrasena antes de devolver el usuario
    const { contrasena: passwordHash, ...userWithoutPassword } = user.toJSON();

    // Responder con el token y los datos del usuario (sin la contraseña)
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: userWithoutPassword  // Devolver la información del usuario sin la contrasena
    });

  } catch (err) {
    console.error('Error al iniciar sesión:', err);  // Imprimir el error en la consola
    res.status(500).json({ error: 'Error al iniciar sesión', details: err.message || err });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
