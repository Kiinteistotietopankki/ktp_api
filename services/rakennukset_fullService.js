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

  // 2. Add metadata
  const rakennuksetWithMetadata = await Promise.all(
    rakennukset.map(async (rakennus) => {
      const metadata = await row_metadata.findOne({
        where: {
          table_name: 'rakennukset_full',
          row_id: rakennus.id_rakennus,
        },
      });

      return {
        ...rakennus.toJSON(),
        metadata: metadata ? metadata.metadata : null,
      };
    })
  );

  // 3. Sort so that isMainBuilding === true comes first
  rakennuksetWithMetadata.sort((a, b) => {
    if (a.isMainBuilding === b.isMainBuilding) return 0;
    return a.isMainBuilding ? -1 : 1; // true first
  });

  return rakennuksetWithMetadata;
}

  async setMainBuilding(id_rakennus, value) {
    const building = await rakennukset_full.findByPk(id_rakennus);
    if (!building) {
      throw new Error('Rakennus not found');
    }

    building.isMainBuilding = value;
    await building.save();

    return building;
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

  async updateWithMetadata(id, dataArray) {
    const item = await rakennukset_full.findByPk(id);
    if (!item) throw new Error('Rakennukset_full not found');

    console.log(dataArray)

    for (const data of dataArray) {
      const { metadata, ...mainData } = data;

      if (Object.keys(mainData).length > 0) {
        await item.update(mainData);
      }

      if (metadata && Object.keys(metadata).length > 0) {
        await Row_metadataService.updateByRowId('rakennukset_full', id, metadata);
      }
      // else {
      //   // optionally ignore or log: no metadata, so no update
      // }
    }

    return item;
  }


  async remove(id) {
    const item = await rakennukset_full.findByPk(id);
    if (!item) throw new Error('Rakennukset_full not found');
    return item.destroy();
  }
}

module.exports = new Rakennukset_fullService();
