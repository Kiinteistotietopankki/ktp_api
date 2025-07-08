// profileroute.js
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const router = express.Router();

router.get('/me', async (req, res) => {
  const token = req.cookies.sessionToken;

  if (!token) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  try {
    const graphRes = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await graphRes.json();
    res.json(data);
  } catch (err) {
    console.error('Failed to fetch user data:', err);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

module.exports = router;