const sequelize = require('../config/dbConfig');
const initModels = require('../models/init-models');

// const rakennukset_fullService = require('./rakennukset_fullService');

const { kiinteistot, rakennukset_full } = initModels(sequelize);

class KiinteistotService {
  async getAll() {
    return kiinteistot.findAll();
  }

  async getAllWithRakennukset(page = 1, limit = 20, orderBy = 'id_kiinteisto', orderDir = 'ASC') {
    const cappedLimit = Math.min(limit, 100);
    const offset = (page - 1) * cappedLimit;

    const { count, rows } = await kiinteistot.findAndCountAll({
      limit: cappedLimit,
      offset,
      order: [[orderBy, orderDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']],
      include: [{ model: rakennukset_full, as: 'rakennukset_fulls' }],
    });

    return {
      data: rows,
      page,
      limit: cappedLimit,
      totalItems: count,
      totalPages: Math.ceil(count / cappedLimit),
    };
  
  }


  async getById(id) {
    return kiinteistot.findByPk(id);
  }

  async getByKiinteistotunnus(id) {
    return kiinteistot.findAll({
      where: { kiinteistotunnus : id }
    });
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
