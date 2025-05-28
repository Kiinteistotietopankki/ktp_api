module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  if (token === 'valid-token') {
    next();
  } else {
    res.status(403).json({ message: 'Invalid token' });
  }
};
