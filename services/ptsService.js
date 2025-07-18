const sequelize = require('../config/dbConfig');
const initModels = require('../models/init-models');
const { PTSProject, PTSEntry } = initModels(sequelize);

class PTSService {
  async create({ kiinteistotunnus, title, created_by, entries }) {
    const newProject = await PTSProject.create({
      kiinteistotunnus,
      title,
      created_by,
    });

    const projectId = newProject.id;

    if (entries?.length > 0) {
      const formattedEntries = entries.map(entry => ({
        id_pts_project: projectId,
        category: entry.category || '',
        section: entry.section || '',
        label: entry.label || '',
        kl_rating: entry.kl_rating || null,
        values_by_year: entry.values_by_year || {},
        metadata: entry.metadata || {},
      }));

      await PTSEntry.bulkCreate(formattedEntries);
    }

    return { success: true, id_pts_project: projectId };
  }

  async getById(id) {
    const project = await PTSProject.findByPk(id);
    if (!project) return null;

    const entries = await PTSEntry.findAll({
      where: { id_pts_project: id },
    });

    return {
      project: project.toJSON(),
      entries: entries.map(e => ({
        ...e.toJSON(),
        values_by_year: e.values_by_year,
        metadata: e.metadata || null,
      })),
    };
  }

  async getByKiinteistotunnus(kiinteistotunnus) {
    return await PTSProject.findAll({
      where: { kiinteistotunnus },
    });
  }

  async update(id, { kiinteistotunnus, title, created_by, entries }) {
    const project = await PTSProject.findByPk(id);
    if (!project) return false;

    await project.update({ kiinteistotunnus, title, created_by });

    await PTSEntry.destroy({ where: { id_pts_project: id } });

    if (entries?.length > 0) {
      const newEntries = entries.map(entry => ({
        id_pts_project: id,
        category: entry.category || '',
        section: entry.section || '',
        label: entry.label || '',
        kl_rating: entry.kl_rating || null,
        values_by_year: entry.values_by_year || {},
        metadata: entry.metadata || {},
      }));

      await PTSEntry.bulkCreate(newEntries);
    }

    return true;
  }

  async remove(id) {
    const project = await PTSProject.findByPk(id);
    if (!project) return false;

    await PTSEntry.destroy({ where: { id_pts_project: id } });
    await project.destroy();

    return true;
  }
}

module.exports = new PTSService();
