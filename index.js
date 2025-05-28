const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/dbConfig');

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
