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
  // Check if a kiinteistö with the same kiinteistotunnus exists
  const existing = await kiinteistot.findOne({
    where: { kiinteistotunnus: kiinteisto.kiinteistotunnus },
  });

  if (existing) {
    throw new Error(`Kiinteistötunnuksella ${kiinteisto.kiinteistotunnus} on jo taloyhtiökortti`);
  }

  // Create the kiinteisto first
  const createdKiinteisto = await kiinteistot.create(kiinteisto);

  if (kiinteisto.rakennukset_fulls && kiinteisto.rakennukset_fulls.length > 0) {
    // Convert rakennusvuosi to numbers
    const rakennusvuodet = kiinteisto.rakennukset_fulls
      .map(r => Number(r.rakennusvuosi))
      .filter(y => !isNaN(y));
    
    const minVuosi = rakennusvuodet.length > 0 ? Math.min(...rakennusvuodet) : null;

    let mainSet = false; // flag to mark first oldest building

    for (const rakennus of kiinteisto.rakennukset_fulls) {
      const rakennusVuosiNum = Number(rakennus.rakennusvuosi);
      const isMain = !mainSet && rakennusVuosiNum === minVuosi;
      if (isMain) mainSet = true;

      await rakennukset_fullService.create({
        ...rakennus,
        id_kiinteisto: createdKiinteisto.id_kiinteisto,
        isMainBuilding: !!isMain,
      });
    }
  }

  return createdKiinteisto;
}


  async getById(id) {
    return kiinteistot.findByPk(id);
  }

  async getByIdWithRakennukset(id) {
    const kiinteisto = await kiinteistot.findByPk(id);
    if (!kiinteisto) return null;

    // reuse rakennukset service to get rakennukset_full by kiinteisto id
    const rakennukset_fulls = await rakennukset_fullService.getById_kiinteistoWithMetadata(id);

    // add rakennukset_fulls to the kiinteisto object (or return both)
    return {
      ...kiinteisto.toJSON(), // convert to plain object
      rakennukset_fulls,
    };
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
