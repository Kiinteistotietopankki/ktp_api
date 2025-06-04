const sequelize = require('../config/dbConfig'); // adjust path if needed
const initModels = require('./init-models');

const models = initModels(sequelize);

module.exports = {
  sequelize,
  models,
};
