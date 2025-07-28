const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const router = express.Router();

router.get('/me', async (req, res) => {
  const token = req.cookies.sessionToken;

  console.log('🔍 Incoming /me request');
  console.log('📦 sessionToken:', token ? '[REDACTED]' : 'None');
  console.log('🧪 Cookies:', req.cookies);
  console.log('🧭 Origin header:', req.headers.origin);

  if (!token) {
    console.warn('⚠️ No session token found');
    return res.status(401).json({ error: 'Not logged in' });
  }

  try {
    const graphRes = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('📡 Microsoft Graph responded with status:', graphRes.status);

    const contentType = graphRes.headers.get('content-type');
    console.log('📄 Response content-type:', contentType);

    const responseText = await graphRes.text();

    if (!graphRes.ok) {
      console.error('❌ Microsoft Graph error:', responseText);
      return res.status(graphRes.status).json({ error: 'Microsoft Graph API error', details: responseText });
    }

    // Try parsing JSON only if content-type is JSON
    if (!contentType || !contentType.includes('application/json')) {
      console.error('❌ Unexpected content-type from Microsoft Graph:', responseText);
      return res.status(500).json({ error: 'Invalid response from Graph API' });
    }

    const data = JSON.parse(responseText);
    console.log('✅ Successfully fetched user data:', data);

    res.json(data);
  } catch (err) {
    console.error('🔥 Failed to fetch user data from Microsoft Graph:', err);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

module.exports = router;
