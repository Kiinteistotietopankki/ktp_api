const sequelize = require('../config/dbConfig'); // import your Sequelize instance
const initModels = require('../models/init-models');

const { Kiinteistot, Rakennukset } = initModels(sequelize);


const getAllRakennukset = async () => {
  return await Rakennukset.findAll();
};

const getRakennusById = async (id) => {
  return await Rakennukset.findByPk(id);
};

const createRakennus = async (data) => {
  // Check if the foreign key id_kiinteisto exists first
  const kiinteistoExists = await Kiinteistot.findByPk(data.id_kiinteisto);
  if (!kiinteistoExists) {
    const error = new Error(`Kiinteisto with id ${data.id_kiinteisto} does not exist`);
    error.statusCode = 400; // Bad Request
    throw error;
  }
  // If exists, create Rakennus
  const newRakennus = await Rakennukset.create(data);
  return newRakennus;
};


const updateRakennus = async (id, data) => {
  const rakennus = await Rakennukset.findByPk(id);
  if (!rakennus) {
    throw new Error('Rakennus not found');
  }
  return await rakennus.update(data);
};

const deleteRakennus = async (id) => {
  const rakennus = await Rakennukset.findByPk(id);
  if (!rakennus) {
    throw new Error('Rakennus not found');
  }
  return await rakennus.destroy();
};

module.exports = {
  getAllRakennukset,
  getRakennusById,
  createRakennus,
  updateRakennus,
  deleteRakennus,
};
