const sequelize = require('../config/dbConfig'); // import your Sequelize instance
const initModels = require('../models/init-models');

const { rakennukset_full } = initModels(sequelize);

class RakennuksetFullService {
  async getAll() {
    return rakennukset_full.findAll();
  }

  async getById(id) {
    return rakennukset_full.findByPk(id);
  }

  async create(data) {
    return rakennukset_full.create(data);
  }

  async update(id, data) {
    const rakennus = await rakennukset_full.findByPk(id);
    if (!rakennus) throw new Error('Rakennus not found');
    return rakennus.update(data);
  }

  async delete(id) {
    const rakennus = await rakennukset_full.findByPk(id);
    if (!rakennus) throw new Error('Rakennus not found');
    return rakennus.destroy();
  }
}

module.exports = new RakennuksetFullService();
