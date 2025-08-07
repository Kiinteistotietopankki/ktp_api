// auth/microsoftAuth.js
require('dotenv').config();
const express = require('express');
const { ConfidentialClientApplication } = require('@azure/msal-node');
const { generateToken } = require('./tokenUtils');

const router = express.Router();

const API_URL = process.env.SELF_API_URL
const FRONTEND_URL = process.env.FRONTEND_URL

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.CLIENT_AUTHORITY,
    clientSecret: process.env.CLIENT_SECRET,
  },
};

const isProd = process.env.NODE_ENV === 'production';

const corsSettings = {
  httpOnly: true,
  secure: isProd, // true in prod with HTTPS
  sameSite: 'None'
};

const cca = new ConfidentialClientApplication(msalConfig);

// Redirect user to Microsoft login
router.get('/login', (req, res) => {
  const authUrlParams = {
    scopes: ['user.read'],
    redirectUri: `${API_URL}/auth/redirect`,
    prompt: 'select_account'
  };

  cca.getAuthCodeUrl(authUrlParams).then((response) => res.redirect(response));
});

router.get('/logout', (req, res) => {
  res.clearCookie('sessionToken', corsSettings);
  res.clearCookie('authToken',corsSettings);
  res.status(200).json({ message: 'Logged out successfully' });
});



router.get('/redirect', async (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ['user.read'],
    redirectUri: `${API_URL}/auth/redirect`,
  };

  try {
    const response = await cca.acquireTokenByCode(tokenRequest);


    res.cookie('sessionToken', response.accessToken, corsSettings); //Azure token

    const jwtToken = generateToken({ userId: response.uniqueId }); //Tokenisoitu userId
    res.cookie('authToken', jwtToken, corsSettings);

     res.redirect(`${FRONTEND_URL}`);

  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).send('Authentication failed.');
  }
});

module.exports = router;