const { Kiinteisto, Rakennus } = require('../models');


const getAllKiinteistot = async () => {
  return await Kiinteisto.findAll();
};

const getKiinteistoById = async (id) => {
  return await Kiinteisto.findByPk(id);
};

const createKiinteisto = async (data) => {
  return await Kiinteisto.create(data);
};

const createKiinteistoWhole = async (kiinteistodata, rakennusdataArray) => {
  const newKiinteisto = await Kiinteisto.create(kiinteistodata);

  const newRakennukset = await Promise.all(
    rakennusdataArray.map(data =>
      Rakennus.create({
        ...data,
        id_kiinteisto: newKiinteisto.id_kiinteisto,
      })
    )
  );

  return { newKiinteisto, newRakennukset };
};

const updateKiinteisto = async (id, data) => {
  const kiinteisto = await Kiinteisto.findByPk(id);
  if (!kiinteisto) {
    throw new Error('Kiinteisto not found');
  }
  return await kiinteisto.update(data);
};

const deleteKiinteisto = async (id) => {
  const kiinteisto = await Kiinteisto.findByPk(id);
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