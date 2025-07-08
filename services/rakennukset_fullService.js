const sequelize = require('../config/dbConfig');
const initModels = require('../models/init-models');

const { rakennukset_full, row_metadata } = initModels(sequelize);
const Row_metadataService = require('./row_metadataService')

class Rakennukset_fullService {
  async getAll() {
    return rakennukset_full.findAll();
  }

  async getById(id) {
    return rakennukset_full.findByPk(id);
  }

  async getById_kiinteisto(id_kiinteisto) {
    return rakennukset_full.findAll({
      where: { id_kiinteisto: id_kiinteisto }
    });
  }

  async getById_kiinteistoWithMetadata(id_kiinteisto) {
  // 1. Get all rakennukset_full for kiinteisto
  const rakennukset = await rakennukset_full.findAll({
    where: { id_kiinteisto },
  });

  const rakennuksetWithMetadata = await Promise.all(
    rakennukset.map(async (rakennus) => {
      const metadata = await row_metadata.findOne({
        where: {
          table_name: 'rakennukset_full',
          row_id: rakennus.id_rakennus,
        },
      });

      // Return combined object
      return {
        ...rakennus.toJSON(),
        metadata: metadata ? metadata.metadata : null,
      };
    })
  );

  return rakennuksetWithMetadata;
  }

  
  async create(data, userid='') {
    // 1. Create the rakennus row
    const rakennus = await rakennukset_full.create(data);

    // 2. Create metadata for the created rakennus row
    await Row_metadataService.createMetadataForRakennus(rakennus.dataValues, userid);

    return rakennus;
  }

  async update(id, data) {
    const item = await rakennukset_full.findByPk(id);
    if (!item) throw new Error('Rakennukset_full not found');
    return item.update(data);
  }

  async remove(id) {
    const item = await rakennukset_full.findByPk(id);
    if (!item) throw new Error('Rakennukset_full not found');
    return item.destroy();
  }
}

module.exports = new Rakennukset_fullService();
