const express = require('express');
const app = express();
const cors = require('cors');

//Route files
const kiinteistoRoutes = require('./routes/kiinteistoRoutes')
const rakennusRoutes = require('./routes/rakennusRoutes')

const sequelize = require('./config/dbConfig');
require('dotenv').config();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); 


app.use('/api/kiinteistot', kiinteistoRoutes)
app.use('/api/rakennukset', rakennusRoutes)

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Ktp_api',
    routes: {
      kiinteistot: '/api/kiinteistot',
      rakennukset: '/api/rakennukset'
      // add more routes here
    }
  });
});

// Function to test DB connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection(); // Call it here

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log({ nodeVersion: process.version });
});
