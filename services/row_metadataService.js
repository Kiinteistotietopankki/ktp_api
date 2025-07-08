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

  async updateByRowId(table_name, row_id, metadataUpdates) {
    // First, fetch current metadata with Sequelize findOne (to merge)
    const item = await row_metadata.findOne({
      where: { table_name, row_id }
    });

    if (!item) throw new Error('Row_metadata not found');

    const currentMetadata = item.metadata || {};

    console.log('CURRENT METADATA AT DB (object):', currentMetadata);

    // Merge new updates in
    for (const [field, newMeta] of Object.entries(metadataUpdates)) {
      currentMetadata[field] = {
        ...(currentMetadata[field] || {}),
        ...newMeta
      };
    }

    console.log('UPDATED METADATA TO SAVE (object):', currentMetadata);

    // Stringify merged metadata for raw SQL update
    const metadataJSONString = JSON.stringify(currentMetadata);

    // Run raw SQL update
    await row_metadata.sequelize.query(
      `UPDATE ${row_metadata.getTableName()} SET metadata = :metadata WHERE table_name = :table_name AND row_id = :row_id`,
      {
        replacements: {
          metadata: metadataJSONString,
          table_name,
          row_id,
        },
        type: row_metadata.sequelize.QueryTypes.UPDATE,
      }
    );

    // Re-fetch updated item to confirm and return
    const savedItem = await row_metadata.findOne({
      where: { table_name, row_id }
    });

    console.log('SAVED METADATA FROM DB (object):', savedItem.metadata);

    return savedItem;
  }

  async remove(id) {
    const item = await row_metadata.findByPk(id);
    if (!item) throw new Error('Row_metadata not found');
    return item.destroy();
  }
}

module.exports = new Row_metadataService();
