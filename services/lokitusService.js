const sequelize = require('../config/dbConfig');
const initModels = require('../models/init-models');

const { lokitus } = initModels(sequelize);
const { Op } = require('sequelize');

class LokitusService {
  async getAll({ 
    page = 1, 
    limit = 20, 
    orderBy = 'id_loki', 
    orderDir = 'ASC', 
    searchTerm = '', 
    userId = '',      // <-- added
    startDate, 
    endDate 
  } = {}) {
    const cappedLimit = Math.min(limit, 100);
    const offset = (page - 1) * cappedLimit;
    const orderDirection = orderDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const where = {};

    // Apply free-text search on userId and message
    if (searchTerm) {
      where[Op.or] = [
        { userId: { [Op.like]: `%${searchTerm}%` } },
        { message: { [Op.like]: `%${searchTerm}%` } },
      ];
    }

    // Apply exact match filter on userId if provided
    if (userId) {
      where.userId = userId;
    }

    // Apply date range filter
    if (startDate && endDate) {
      where.pvm = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else if (startDate) {
      where.pvm = {
        [Op.gte]: new Date(startDate),
      };
    } else if (endDate) {
      where.pvm = {
        [Op.lte]: new Date(endDate),
      };
    }

    const { count, rows } = await lokitus.findAndCountAll({
      where,
      limit: cappedLimit,
      offset,
      order: [[orderBy, orderDirection]],
      distinct: true,
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
    return lokitus.findByPk(id);
  }

  async create(data) {
    return lokitus.create(data);
  }

  async update(id, data) {
    const item = await lokitus.findByPk(id);
    if (!item) throw new Error('Lokitus not found');
    return item.update(data);
  }

  async remove(id) {
    const item = await lokitus.findByPk(id);
    if (!item) throw new Error('Lokitus not found');
    return item.destroy();
  }
}

module.exports = new LokitusService();
