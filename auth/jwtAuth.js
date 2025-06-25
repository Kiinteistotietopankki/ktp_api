const { verifyToken } = require('../auth/tokenUtils');

const authenticateJWT = (req, res, next) => {
  const token = req.cookies?.authToken;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.userId }; // attach user to request
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticateJWT;