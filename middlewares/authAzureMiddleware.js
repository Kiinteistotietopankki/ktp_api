const authenticateAzure = async (req, res, next) => {
  const azureToken = req.cookies?.sessionToken;
  if (!azureToken) return res.status(401).json({ error: 'Unauthorized' });

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

module.exports = authenticateAzure;