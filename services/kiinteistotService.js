const sequelize = require('../config/dbConfig');
const initModels = require('../models/init-models');

const { kiinteistot } = initModels(sequelize);

class KiinteistotService {
  async getAll() {
    return kiinteistot.findAll();
  }

  async getById(id) {
    return kiinteistot.findByPk(id);
  }

  async create(data) {
    return kiinteistot.create(data);
  }

  async update(id, data) {
    const item = await kiinteistot.findByPk(id);
    if (!item) throw new Error('Kiinteistot not found');
    return item.update(data);
  }

  async remove(id) {
    const item = await kiinteistot.findByPk(id);
    if (!item) throw new Error('Kiinteistot not found');
    return item.destroy();
  }
}

module.exports = new KiinteistotService();
