// auth/microsoftAuth.js
require('dotenv').config();
const express = require('express');
const { ConfidentialClientApplication } = require('@azure/msal-node');
const { generateToken } = require('./tokenUtils');


const router = express.Router();

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
    redirectUri: 'http://localhost:3001/auth/redirect',
  };

  cca.getAuthCodeUrl(authUrlParams).then((response) => res.redirect(response));
});

router.get('/logout', (req, res) => {
  res.clearCookie('sessionToken', {
    httpOnly: true,
    secure: false,  // set to true if using HTTPS in production
    sameSite: 'lax'
  });
  res.clearCookie('authToken', {
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
    console.log('User azure id', response.uniqueId)    // Store userId (uniqueId) in session


    res.cookie('sessionToken', response.accessToken, { httpOnly: true, secure: false }); //Azure token

    const jwtToken = generateToken({ userId: response.uniqueId }); //Tokenisoitu userId
    res.cookie('authToken', jwtToken, {  
      httpOnly: true,
      secure: false, // change to true in production with HTTPS
      sameSite: 'lax',
      // maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.redirect('http://localhost:3000/');

  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).send('Authentication failed.');
  }
});

module.exports = router;
