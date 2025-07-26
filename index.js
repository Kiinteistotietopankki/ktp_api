require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const { default: axios } = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');

const sequelize = require('./config/dbConfig');
const swaggerSpec = require('./swagger.js');

const authenticateAzure = require('./middlewares/authAzureMiddleware');
const authenticateJWT = require('./auth/jwtAuth.js'); 

const microsoftAuthRoutes = require('./auth/microsoftAuth.js');
const profileRoute = require('./routes/profileRoute.js');
const rakennuksetRoutes = require('./routes/rakennukset_fullRoutes.js');
const kiinteistotRoutes = require('./routes/kiinteistotRoutes.js');
const lokitusRoutes = require('./routes/lokitusRoutes.js')
const metadataRoutes = require('./routes/row_metadataRoutes.js')

const MMLKiinteistotRoutes = require('./routes/MMLKiinteistotRoutes.js')
const MMLTulosteetRoutes = require('./routes/MMLTulosteetRoutes.js')
const MMLTilastotRoutes = require('./routes/MMLTilastotRoutes.js')
const MMLKartatRoutes = require('./routes/MMLKartatRoutes.js')
const MMLHuoneistotIJRoutes = require('./routes/MMLHuoneistotIJRoutes.js')

const KiinteistoHakuRoutes = require('./routes/kiinteistoHakuRoutes.js')

//Map cache handling
const cleanOldCacheFiles = require('./utils/cleanCache.js');
const cacheDir = path.join(process.cwd(), './cache'); // or wherever your cache is
cleanOldCacheFiles(cacheDir).catch(console.error);
const CLEAN_INTERVAL_MS = 24 * 60 * 60 * 1000; // once a day

setInterval(() => {
  cleanOldCacheFiles(cacheDir).catch(console.error);
  console.log('Map image cache cleared from old items.')
}, CLEAN_INTERVAL_MS);


const app = express();
const PORT = process.env.PORT || 3001;

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
app.use('/api', authenticateAzure);
app.use('/me', authenticateAzure);

app.use('/api/kiinteistot', kiinteistotRoutes);
app.use('/api/rakennukset_full', rakennuksetRoutes);
app.use('/api/lokitus', lokitusRoutes);
app.use('/api/row_metadata', metadataRoutes);
app.use('/api/mml', MMLKiinteistotRoutes);
app.use('/api/mmltulosteet', MMLTulosteetRoutes);
app.use('/api/tilastot', MMLTilastotRoutes);
app.use('/api/kartat', MMLKartatRoutes)
app.use('/api/mmlij', MMLHuoneistotIJRoutes)
app.use('/api/haku', KiinteistoHakuRoutes)



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
