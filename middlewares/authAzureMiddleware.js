const fetch = require('node-fetch'); // Required for Node <18

const authenticateAzure = async (req, res, next) => {
  const azureToken = req.cookies?.sessionToken;

  // Define allowed frontend origins
  const allowedOrigins = [
    'http://localhost:3000',
    'https://yellow-tree-07bb64803.6.azurestaticapps.net',
  ];

  // Dynamically allow origin for CORS
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Check if token exists
  if (!azureToken) {
    console.warn('❌ No sessionToken cookie found');
    return res.status(401).json({ error: 'Unauthorized - missing token' });
  }

  try {
    // Verify the token with Microsoft Graph
    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: `Bearer ${azureToken}`,
      },
    });

    if (!response.ok) {
      console.warn('❌ Token validation failed from Microsoft Graph');
      throw new Error('Invalid token');
    }

    const user = await response.json();
    req.user = user;
    next(); // ✅ Pass control to the next middleware
  } catch (err) {
    console.error('❌ Token verification error:', err.message);
    res.status(403).json({ error: 'Microsoft token invalid or expired' });
  }
};

module.exports = authenticateAzure;
