require('dotenv').config();
const Sequelize = require('sequelize');
const SequelizeAuto = require('sequelize-auto');

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
    dialectOptions: {
      ssl: {
        // For Azure MySQL, this is usually enough:
        rejectUnauthorized: true
      }
    }
  }
);

const auto = new SequelizeAuto(sequelize, null, null, {
  directory: './models',
  caseModel: 'o',
  caseFile: 'o',
  singularize: false,
  noWrite: false,
});

auto.run()
  .then(data => {
    console.log('✅ Models generated successfully');
  })
  .catch(err => {
    console.error('❌ Error generating models:', err);
  });