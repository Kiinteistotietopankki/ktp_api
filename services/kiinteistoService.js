const sequelize = require('../config/dbConfig'); // import your Sequelize instance
const initModels = require('../models/init-models');

const { Kiinteistot, Rakennukset, Rakennustiedot_ryhti, Rakennusluokitukset_ryhti } = initModels(sequelize);


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

  // Create Rakennukset linked to new Kiinteisto
  const newRakennukset = await Promise.all(
    rakennusdataArray.map(data =>
      Rakennukset.create({
        ...data,
        id_kiinteisto: newKiinteisto.id_kiinteisto,
      })
    )
  );

  // For each new Rakennus, create associated Rakennustiedot_ryhti if any data exists
  // Assuming each rakennusdata might include 'rakennustiedotArray' with data for Rakennustiedot_ryhti
  const rakennustiedotPromises = [];

  newRakennukset.forEach((rakennus, index) => {
    const rakennustiedotArray = rakennusdataArray[index].rakennustiedotArray;
    if (Array.isArray(rakennustiedotArray)) {
      rakennustiedotArray.forEach(tieto => {
        rakennustiedotPromises.push(
          Rakennustiedot_ryhti.create({
            ...tieto,
            id_rakennus: rakennus.id_rakennus, // link to Rakennus
          })
        );
      });
    }
  });

  const newRakennustiedot = await Promise.all(rakennustiedotPromises);

  return { newKiinteisto, newRakennukset, newRakennustiedot };
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