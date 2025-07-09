const { createLogger, format } = require('winston');
const Transport = require('winston-transport');
const axios = require('axios');
const crypto = require('crypto');

// Replace with your Azure Log Analytics details
const workspaceId = process.env.AZURE_LOG_ANALYTICS_WORKSPACE_ID;
const sharedKey = process.env.AZURE_LOG_ANALYTICS_PRIMARY_KEY;
const logType = 'AuditLogs'; // You can name it anything

// Function to build the authorization signature
function buildSignature(date, contentLength) {
  const stringToHash = `POST\n${contentLength}\napplication/json\nx-ms-date:${date}\n/api/logs`;
  const decodedKey = Buffer.from(sharedKey, 'base64');
  const encodedHash = crypto
    .createHmac('sha256', decodedKey)
    .update(stringToHash, 'utf8')
    .digest('base64');

  return `SharedKey ${workspaceId}:${encodedHash}`;
}

// Function to send log to Azure Log Analytics
function sendToAzureLogAnalytics(log) {
  const jsonData = JSON.stringify(log);
  const date = new Date().toUTCString();
  const contentLength = Buffer.byteLength(jsonData, 'utf8');
  const signature = buildSignature(date, contentLength);

  axios.post(
    `https://${workspaceId}.ods.opinsights.azure.com/api/logs?api-version=2016-04-01`,
    jsonData,
    {
      headers: {
        'Content-Type': 'application/json',
        'Log-Type': logType,
        'x-ms-date': date,
        'Authorization': signature
      }
    }
  ).catch(err => {
    console.error('Azure Log upload error:', err.response?.data || err.message);
  });
}

// Custom Winston transport
class AzureTransport extends Transport {
  log(info, callback) {
    setImmediate(() => this.emit('logged', info));
    sendToAzureLogAnalytics(info);
    callback();
  }
}

// Create the logger
const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new AzureTransport()
  ]
});

module.exports = logger;
