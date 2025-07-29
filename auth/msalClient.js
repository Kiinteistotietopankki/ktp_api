// auth/msalClient.js
require('dotenv').config();
const { ConfidentialClientApplication } = require('@azure/msal-node');

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET,
  },
};

const cca = new ConfidentialClientApplication(msalConfig);

async function getAccessToken() {
  try {
    const result = await cca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });
    return result.accessToken;
  } catch (error) {
    console.error('❌ Failed to acquire access token:', error);
    throw error;
  }
}

module.exports = { getAccessToken };
