const sequelize = require('../config/dbConfig'); // import your Sequelize instance
const initModels = require('../models/init-models');

const { rakennukset } = initModels(sequelize);
const { findRakennustiedotById_Rakennus } = require('./rakennustiedotService.js')


const getAllRakennukset = async () => {
  return await rakennukset.findAll();
};

const findRakennusByKiinteistoId = async (kiinteistoId) => {
  return await rakennukset.findAll({
    where: { id_kiinteisto: kiinteistoId }
  });
};

const updateRakennus = async (id, data) => {
  const rakennus = await rakennukset.findByPk(id);
  if (!rakennus) {
    throw new Error('Rakennus not found');
  }
  return await rakennus.update(data);
};

const deleteRakennus = async (id) => {
  const rakennus = await rakennukset.findByPk(id);
  if (!rakennus) {
    throw new Error('Rakennus not found');
  }
  return await rakennus.destroy();
};


const getRakennusById = async (id) => {
  return await rakennukset.findByPk(id);
};



module.exports = {
  getAllRakennukset,
  getRakennusById,
  updateRakennus,
  deleteRakennus,
  findRakennusByKiinteistoId
};
