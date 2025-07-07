const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config(); 
const cookieParser = require('cookie-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.js')



// const authenticateJWT = require('./auth/jwtAuth');
// const authMiddleware = require('./middlewares/authMiddleware');
const authenticateAzure = require('./middlewares/authAzureMiddleware')


app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000','https://ktpapi-b9bpd4g9ewaqa4af.swedencentral-01.azurewebsites.net'],
  credentials: true
}));

app.use(cookieParser());


const microsoftAuthRoutes = require('./auth/microsoftAuth');
app.use('/auth', microsoftAuthRoutes);

const profileRoute = require('./routes/profileroute');
app.use(profileRoute);


const rakennuksetRoutes = require('./routes/rakennukset_fullRoutes.js')
const kiinteistotRoutes = require('./routes/kiinteistotRoutes.js')

// app.use('/api', authenticateAzure) 
// app.use('/me', authenticateAzure) 


// app.use('/api/kiinteistot', kiinteistoRoutes);
app.use('/api/kiinteistot', kiinteistotRoutes)
app.use('/api/rakennukset_full', rakennuksetRoutes);

const sequelize = require('./config/dbConfig');
const { default: axios } = require('axios');
const PORT = process.env.PORT || 3001;


//Swagger setup
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const HttpsProxyAgent = require('https-proxy-agent');



app.get('/test-proxy', async (req, res) => {
  try {
    const proxy = 'http://52.155.251.10:3128'; 
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


async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

app.listen(PORT, () => {
  console.log(`Server docs at http://localhost:${PORT}/api/docs`);
  console.log({ nodeVersion: process.version });
});
