require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        // Depending on your MySQL SSL config, either:
        // For Azure MySQL, often just "rejectUnauthorized: true"
        // Or specify cert/key/ca if you have those files:

        rejectUnauthorized: true

        // OR if you have certificates, something like:
        // ca: fs.readFileSync(__dirname + '/ssl/BaltimoreCyberTrustRoot.crt.pem'),
        // key: fs.readFileSync(__dirname + '/ssl/client-key.pem'),
        // cert: fs.readFileSync(__dirname + '/ssl/client-cert.pem'),
      }
    }
  }
);

module.exports = sequelize;
