const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config(); 
const cookieParser = require('cookie-parser');
const session = require('express-session')



app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000', 'https://ktp-demo-static.onrender.com', 'https://ktpapi-b9bpd4g9ewaqa4af.swedencentral-01.azurewebsites.net'],
  credentials: true
}));

app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET, // use your generated secret here
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,       // set true if HTTPS in production!
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));


const microsoftAuthRoutes = require('./auth/microsoftAuth');
app.use('/auth', microsoftAuthRoutes);
const profileRoute = require('./routes/profileroute');
app.use(profileRoute);

const kiinteistoRoutes = require('./routes/kiinteistoRoutes');
const rakennusRoutes = require('./routes/rakennusRoutes');

app.use('/api/kiinteistot', kiinteistoRoutes);
app.use('/api/rakennukset', rakennusRoutes);

const sequelize = require('./config/dbConfig');
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Ktp_api',
    routes: {
      kiinteistot: '/api/kiinteistot',
      rakennukset: '/api/rakennukset',
      auth: '/auth/login'
    }
  });
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
  console.log(`Server running at http://localhost:${PORT}`);
  console.log({ nodeVersion: process.version });
});
