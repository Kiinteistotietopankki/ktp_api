const authenticateAzure = async (req, res, next) => {
  const azureToken = req.cookies?.sessionToken;

  // Allowed frontend origins
  const allowedOrigins = [
    'http://localhost:3000',
    'https://yellow-tree-07bb64803.6.azurestaticapps.net'
  ];

  // Dynamically set Access-Control-Allow-Origin if the Origin header is allowed
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (!azureToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: `Bearer ${azureToken}`,
      },
    });

    if (!response.ok) throw new Error('Invalid token');

    const user = await response.json();
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Microsoft token invalid or expired' });
  }
};