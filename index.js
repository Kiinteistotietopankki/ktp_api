require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const { default: axios } = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/dbConfig');
const swaggerSpec = require('./swagger.js');

const authenticateAzure = require('./middlewares/authAzureMiddleware');

const microsoftAuthRoutes = require('./auth/microsoftAuth.js');
const profileRoute = require('./routes/profileRoute.js');
const rakennuksetRoutes = require('./routes/rakennukset_fullRoutes.js');
const kiinteistotRoutes = require('./routes/kiinteistotRoutes.js');
const lokitusRoutes = require('./routes/lokitusRoutes.js')
const metadataRoutes = require('./routes/row_metadataRoutes.js')

const MMLKiinteistotRoutes = require('./routes/MMLKiinteistotRoutes.js')
const MMLTulosteetRoutes = require('./routes/MMLTulosteetRoutes.js')

// Middleware setup
app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://ktpapi-b9bpd4g9ewaqa4af.swedencentral-01.azurewebsites.net'
  ],
  credentials: true
}));

app.use(cookieParser());

// Swagger documentation route
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Authentication routes
app.use('/auth', microsoftAuthRoutes);

// Main application routes
app.use(profileRoute);

// Protected API routes (COMMENTED OUT ON DEV!!!!!!!!!)
// app.use('/api', authenticateAzure);
// app.use('/me', authenticateAzure);

app.use('/api/kiinteistot', kiinteistotRoutes);
app.use('/api/rakennukset_full', rakennuksetRoutes);
app.use('/api/lokitus', lokitusRoutes);
app.use('/api/row_metadata', metadataRoutes);
app.use('/api/mml', MMLKiinteistotRoutes);
app.use('/api/mmltulosteet', MMLTulosteetRoutes);


// Proxy test route
app.get('/test-proxy', async (req, res) => {
  try {
    const proxy = process.env.PROXY_URL;
    const agent = new HttpsProxyAgent(proxy);

    const response = await axios.get('https://api.ipify.org?format=json', {
      httpsAgent: agent
    });

    res.json({
      outboundIp: response.data.ip,
      proxyUsed: proxy
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Proxy test failed');
  }
});

// Test DB connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testConnection();

// Serve raw swagger JSON at /api/docs/swagger.json
app.get('/docsraw/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server docs at http://localhost:${PORT}/api/docs`);
  console.log({ nodeVersion: process.version });
});
