const sequelize = require('../config/dbConfig');
const initModels = require('../models/init-models');

const { row_metadata } = initModels(sequelize);

class Row_metadataService {
  async getAll() {
    return row_metadata.findAll();
  }

  async getById(id) {
    return row_metadata.findByPk(id);
  }

  async getByTableAndRow(table_name, row_id) {
    return row_metadata.findOne({
      where: {
        table_name,
        row_id,
      },
    });
  }

  async create(data) {
    return row_metadata.create(data);
  }

  generateMetadataFromRakennus(rakennusObj, userid='') {
    const metadata = {};

    for (const key of Object.keys(rakennusObj)) {
      if (['id_rakennus', 'createdAt', 'updatedAt'].includes(key)) continue;

      metadata[key] = {
        source: 'Ympäristö.fi-RYHTI',
        madeby: userid,
      };
    }

    return metadata;
  }

  async createMetadataForRakennus(rakennusObj, userid='') {
    const metadata = this.generateMetadataFromRakennus(rakennusObj, userid);

    const now = new Date();

    return row_metadata.create({
      table_name: 'rakennukset_full',
      row_id: rakennusObj.id_rakennus,
      metadata,
      createdAt: now,
      updatedAt: now,
    });
  }

  async update(id, data) {
    const item = await row_metadata.findByPk(id);
    if (!item) throw new Error('Row_metadata not found');
    return item.update(data);
  }

  async remove(id) {
    const item = await row_metadata.findByPk(id);
    if (!item) throw new Error('Row_metadata not found');
    return item.destroy();
  }
}

module.exports = new Row_metadataService();
