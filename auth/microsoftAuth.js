// auth/microsoftAuth.js
require('dotenv').config();
const express = require('express');
const { ConfidentialClientApplication } = require('@azure/msal-node');

const router = express.Router();

const msalConfig = {
  auth: {
    clientId: 
    "e9e3688f-df1a-4f99-b541-9a09640647dd",
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
router.get('/logout', (req, res) => {
  res.clearCookie('sessionToken', {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax'
  });
  res.status(200).json({ message: 'Logged out successfully' }); 
});



router.get('/redirect', async (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ['user.read'],
    redirectUri: 'http://localhost:3001/auth/redirect',
  };

  try {
    const response = await cca.acquireTokenByCode(tokenRequest);
    console.log('Login successful');
    console.log('Access token:', response.accessToken);
    console.log('Logged in as:', response.account.username);
    console.log('User azure id', response.uniqueId)
        // Store userId (uniqueId) in session
    req.session.userId = response.uniqueId;

    console.log('User id inside redirect', req.session.userId)

    res.cookie('sessionToken', response.accessToken, { httpOnly: true, secure: false });

    // req.session.save((err) => {
    //   if (err) {
    //     console.error('Session save error:', err);
    //     return res.status(500).send('Session save failed');
    //   }
    //   console.log('User id inside redirect', req.session.userId);
    //   res.cookie('sessionToken', response.accessToken, { httpOnly: true, secure: false });
    // });

    res.redirect('http://localhost:3000/');

  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).send('Authentication failed.');
  }
});

module.exports = router;
