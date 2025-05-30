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

const createKiinteistoWhole = async (kiinteistodata, rakennusdataArray, rakennusluokituksetArray) => {
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

  // Create Rakennustiedot_ryhti linked to each Rakennus
  const rakennustiedotPromises = [];
  newRakennukset.forEach((rakennus, index) => {
    const rakennustiedotArray = rakennusdataArray[index].rakennustiedotArray;
    if (Array.isArray(rakennustiedotArray)) {
      rakennustiedotArray.forEach(tieto => {
        rakennustiedotPromises.push(
          Rakennustiedot_ryhti.create({
            ...tieto,
            id_rakennus: rakennus.id_rakennus,
          })
        );
      });
    }
  });
  const newRakennustiedot = await Promise.all(rakennustiedotPromises);

  // Create Rakennusluokitukset_ryhti linked to each Rakennus
  const rakennusluokituksetPromises = [];
  newRakennukset.forEach((rakennus, index) => {
    const rakennusluokituksetArray = rakennusdataArray[index].rakennusluokituksetArray;
    if (Array.isArray(rakennusluokituksetArray)) {
      rakennusluokituksetArray.forEach(luokitus => {
        rakennusluokituksetPromises.push(
          Rakennusluokitukset_ryhti.create({
            ...luokitus,
            rakennus_id: rakennus.id_rakennus,
          })
        );
      });
    }
  });
  const newRakennusluokitukset = await Promise.all(rakennusluokituksetPromises);

  return { 
    newKiinteisto, 
    newRakennukset, 
    newRakennustiedot, 
    newRakennusluokitukset 
  };
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