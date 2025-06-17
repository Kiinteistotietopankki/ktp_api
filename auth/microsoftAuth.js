// auth/microsoftAuth.js
require('dotenv').config();
const express = require('express');
const { ConfidentialClientApplication } = require('@azure/msal-node');

const router = express.Router();

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/waativa.fi`,
    clientSecret: process.env.CLIENT_SECRET,
  },
};

const cca = new ConfidentialClientApplication(msalConfig);

// Redirect user to Microsoft login
router.get('/login', (req, res) => {
  const authUrlParams = {
    scopes: ['user.read'],
    redirectUri: 'http://localhost:3001/auth/redirect',
  };

  cca.getAuthCodeUrl(authUrlParams).then((response) => res.redirect(response));
});


router.get('/redirect', async (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ['user.read'],
    redirectUri: 'http://localhost:3001/auth/redirect',
  };

  try {
    const response = await cca.acquireTokenByCode(tokenRequest);
    res.cookie('sessionToken', response.accessToken, { httpOnly: true, secure: false }); // Set secure: true in production
    res.redirect('http://localhost:3000/');
  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).send('Authentication failed.');
  }
});

module.exports = router;
