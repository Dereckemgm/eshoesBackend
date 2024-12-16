const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Formato "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guarda la información del usuario en req.user
    next();  // Continúa con la siguiente ruta
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido.' });
  }
}

module.exports = authenticateToken;
