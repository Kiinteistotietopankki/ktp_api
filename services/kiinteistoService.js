const sequelize = require('../config/dbConfig'); // import your Sequelize instance
const initModels = require('../models/init-models');

const { Kiinteistot, Rakennukset } = initModels(sequelize);


const getAllKiinteistot = async () => {
  return await Kiinteistot.findAll();
};

const getKiinteistoById = async (id) => {
  return await Kiinteistot.findByPk(id);
};

const createKiinteisto = async (data) => {
  return await Kiinteistot.create(data);
};

const createKiinteistoWhole = async (kiinteistodata, rakennusdataArray) => {
  const newKiinteisto = await Kiinteistot.create(kiinteistodata);

  const newRakennukset = await Promise.all(
    rakennusdataArray.map(data =>
      Rakennukset.create({
        ...data,
        id_kiinteisto: newKiinteisto.id_kiinteisto,
      })
    )
  );

  return { newKiinteisto, newRakennukset };
};

const updateKiinteisto = async (id, data) => {
  const kiinteisto = await Kiinteistot.findByPk(id);
  if (!kiinteisto) {
    throw new Error('Kiinteisto not found');
  }
  return await kiinteisto.update(data);
};

const deleteKiinteisto = async (id) => {
  const kiinteisto = await Kiinteistot.findByPk(id);
  if (!kiinteisto) {
    throw new Error('Kiinteisto not found');
  }
  return await kiinteisto.destroy();
};

module.exports = {
  getAllKiinteistot,
  getKiinteistoById,
  createKiinteisto,
  createKiinteistoWhole,
  updateKiinteisto,
  deleteKiinteisto,
};