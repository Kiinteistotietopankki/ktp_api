const { Sequelize, Op } = require('sequelize');   // <-- add this
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
      values_by_year: JSON.stringify(entry.values_by_year || {}), 
      metadata: JSON.stringify(entry.metadata || {}),             
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

  async getLabelsByCategoryAndSection(category, section) {
    // Check if any entries exist for this category
    const categoryExists = await PTSEntry.count({
      where: { category },
    });

    if (categoryExists === 0) {
      return { searchedCategory: category, categoryExists: false, searchedSection:section, sectionExists: false, labels: [] };
    }

    // Check if any entries exist for this category + section
    const sectionExists = await PTSEntry.count({
      where: { category, section },
    });

    if (sectionExists === 0) {
      return { searchedCategory:category ,categoryExists: true, searchedSection:section , sectionExists: false, labels: [] };
    }

    // Now fetch distinct non-empty labels
    const labels = await PTSEntry.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("label")), "label"]
      ],
      where: {
        category,
        section,
        label: {
          [Op.and]: [
            { [Op.ne]: null },
            { [Op.ne]: "" }
          ]
        }
      },
      raw: true
    });

    return {
      searchedCategory: category,
      categoryExists: true,
      searchedSection: section,
      sectionExists: true,
      labels: labels.map(l => l.label)
    };
  }
}

module.exports = new PTSService();
