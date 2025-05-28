const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/dbConfig');
require('dotenv').config();

app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Ktp_api',
    routes: {
      users: '/api/users',
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
});
