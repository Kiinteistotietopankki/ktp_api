const sequelize = require('../config/dbConfig');
const initModels = require('../models/init-models');

const rakennukset_fullService = require('./rakennukset_fullService');
const { Op } = require('sequelize');

const { kiinteistot, rakennukset_full } = initModels(sequelize);

class KiinteistotService {
  async getAll() {
    return kiinteistot.findAll();
  }

  async getAllWithRakennukset(page = 1, limit = 20, orderBy = 'id_kiinteisto', orderDir = 'ASC', searchTerm = '') {
    const cappedLimit = Math.min(limit, 100);
    const offset = (page - 1) * cappedLimit;

    const orderDirection = orderDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    let count, rows;

    if (searchTerm.includes('-')) {
      // Search by kiinteistotunnus
      ({ count, rows } = await kiinteistot.findAndCountAll({
        limit: cappedLimit,
        offset,
        order: [[orderBy, orderDirection]],
        where: {
          kiinteistotunnus: searchTerm,
        },
        include: [
          {
            model: rakennukset_full,
            as: 'rakennukset_fulls',
          },
        ],
        distinct: true,
      }));
    } else {
      // Search in associated rakennukset_fulls fields
      ({ count, rows } = await kiinteistot.findAndCountAll({
        limit: cappedLimit,
        offset,
        order: [[orderBy, orderDirection]],
        include: [
          {
            model: rakennukset_full,
            as: 'rakennukset_fulls',
            where: {
              [Op.or]: [
                { toimipaikka: { [Op.like]: `%${searchTerm}%` } },
                { osoite: { [Op.like]: `%${searchTerm}%` } },
                { postinumero: { [Op.like]: `%${searchTerm}%` } },
              ],
            },
            required: true, // Ensures filtering works correctly
          },
        ],
        distinct: true,
      }));
    }

    return {
      data: rows,
      page,
      limit: cappedLimit,
      totalItems: count,
      totalPages: Math.ceil(count / cappedLimit),
    };
  }


  async createWithRakennukset(kiinteisto) {
    // Create the kiinteisto first
    const createdKiinteisto = await kiinteistot.create(kiinteisto);

    // Create each rakennukset_full separately and assign kiinteistoId
    if (kiinteisto.rakennukset_fulls && kiinteisto.rakennukset_fulls.length > 0) {
      for (const rakennus of kiinteisto.rakennukset_fulls) {
        await rakennukset_fullService.create({
          ...rakennus,
          id_kiinteisto: createdKiinteisto.id_kiinteisto, // foreign key
        });
      }
    }

    return createdKiinteisto;
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
