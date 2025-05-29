require('dotenv').config();
const API_KEY = process.env.API_KEY

function checkApiKey(req, res, next) {
  // API key could be sent via header: x-api-key
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'API key missing' });
  }

  if (apiKey !== API_KEY) {
    return res.status(403).json({ error: 'Invalid API key' });
  }

  next(); // API key is valid, continue
}

module.exports = checkApiKey;
