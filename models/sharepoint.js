const { ConfidentialClientApplication } = require('@azure/msal-node');
const axios = require('axios');
require('dotenv').config();

const cca = new ConfidentialClientApplication({
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET,
  },
});

async function uploadPdfToSharePoint(fileBuffer, fileName) {
  try {
    const result = await cca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });
    const accessToken = result.accessToken;

   
    const siteRes = await axios.get(
      'https://graph.microsoft.com/v1.0/sites/oywaativaab.sharepoint.com:/sites/SharepointTesti',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const siteId = siteRes.data.id;

    const drivesRes = await axios.get(
      `https://graph.microsoft.com/v1.0/sites/${siteId}/drives`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const drive = drivesRes.data.value.find(d => d.name === 'Jaetut asiakirjat');
    if (!drive) throw new Error('Drive not found');

    
    const uploadUrl = `https://graph.microsoft.com/v1.0/drives/${drive.id}/root:/Raportit/${encodeURIComponent(fileName)}:/content`;

    const uploadRes = await axios.put(uploadUrl, fileBuffer, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/pdf',
      },
    });

    console.log('Upload success:', uploadRes.data);
    return uploadRes.data;
  } catch (err) {
    console.error('Upload failed:', err.response?.data || err.message);
    throw err;
  }
}

module.exports = { uploadPdfToSharePoint };
