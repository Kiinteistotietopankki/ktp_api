const sequelize = require('../config/dbConfig'); 
const initModels = require('../models/init-models');

const { lokitus } = initModels(sequelize);

const createLoki = async (data) => {
  try {
    const newEntry = await lokitus.create(data);
    return newEntry;
  } catch (error) {
    // Log the error internally if needed
    console.error('Error creating Loki log:', error);
    // Re-throw to let the caller handle it (controller or middleware)
    throw error;
  }
};

module.exports = {
  createLoki
};