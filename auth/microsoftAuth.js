require('dotenv').config();
const express = require('express');
const { ConfidentialClientApplication } = require('@azure/msal-node');
const { generateToken } = require('./tokenUtils');

const router = express.Router();

const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
const SELF_API_URL = process.env.SELF_API_URL || 'http://localhost:3001'

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.CLIENT_AUTHORITY,
    clientSecret: process.env.CLIENT_SECRET,
  },
};

const cca = new ConfidentialClientApplication(msalConfig);

// Redirect user to Microsoft login
router.get('/login', (req, res) => {
  const authUrlParams = {
    scopes: ['user.read'],
    redirectUri: `${SELF_API_URL}/auth/redirect`,
    prompt: 'select_account'
  };

  cca.getAuthCodeUrl(authUrlParams).then((response) => res.redirect(response));
});

router.get('/logout', (req, res) => {
  res.clearCookie('sessionToken', {
    httpOnly: true,
    secure: false,  // set to true if using HTTPS in production
    sameSite: 'None'
  });
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'None'
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

router.get('/redirect', async (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ['user.read'],
    redirectUri: `${SELF_API_URL}/auth/redirect`,
  };

  try {
    const response = await cca.acquireTokenByCode(tokenRequest);

    const isProd = false;

    res.cookie('sessionToken', response.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'None',    
    });

    const jwtToken = generateToken({ userId: response.uniqueId }); // Tokenisoitu userId
    res.cookie('authToken', jwtToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'None'   
    });

    res.redirect(`${FRONTEND_URL}`);

  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).send('Authentication failed.');
  }
});

module.exports = router;
