const jwt = require('jsonwebtoken');

// Tämä on sitä varten, että userId:tä ei 'tamperoida' selaimen cookiesista

const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { generateToken, verifyToken };