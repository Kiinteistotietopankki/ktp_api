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

  async create(data) {
    return row_metadata.create(data);
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
