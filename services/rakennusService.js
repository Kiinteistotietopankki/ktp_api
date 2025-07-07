const sequelize = require('../config/dbConfig'); // import your Sequelize instance
const initModels = require('../models/init-models');

const { rakennukset, row_metadata  } = initModels(sequelize);

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


const createRakennus = async (data) => {
  return await rakennukset.create(data);
};


const createRakennusWithMetadataYmparisto = async (data, user = 'unknown') => {
  // 1. Extract metadata fields
  const metadataFields = {};
  for (const key of Object.keys(data)) {
    metadataFields[key] = {
      source: 'Ympäristö.fi',
      modifiedby: user,
      modifiedAt: new Date().toISOString()
    };
  }

  // 2. Create the rakennus row
  const createdRakennus = await rakennukset.create(data);

  // 3. Create metadata entry
  const createdMetadata = await row_metadata.create({
    table_name: 'rakennukset',
    row_id: createdRakennus.id_rakennus,
    metadata: metadataFields
  });

  // 4. Return both rakennus and metadata
  return {
    rakennus: createdRakennus,
    metadata: createdMetadata
  };
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
  findRakennusByKiinteistoId,
  createRakennus,
  createRakennusWithMetadataYmparisto
};
