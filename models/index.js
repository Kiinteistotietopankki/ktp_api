const Sequelize = require('sequelize');
const sequelize = require('../config/dbConfig'); // Your Sequelize instance

// Import models
const Kiinteisto = require('./kiinteistoModel')(sequelize, Sequelize.DataTypes);
const Rakennus = require('./rakennusModel')(sequelize, Sequelize.DataTypes);

// Collect models into one object
const models = {
  Kiinteisto,
  Rakennus,
};

// Call associate on each model if exists, passing all models
Object.values(models).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

module.exports = {
  ...models,
  sequelize,  // Export sequelize instance for syncing and queries
  Sequelize,  // Export Sequelize for data types and operators
};