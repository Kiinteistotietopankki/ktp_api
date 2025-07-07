const sequelize = require('../config/dbConfig');
const initModels = require('../models/init-models');

const { rakennukset_full } = initModels(sequelize);

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

  async create(data) {
    return rakennukset_full.create(data);
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
