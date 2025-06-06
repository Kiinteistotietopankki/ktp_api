const sequelize = require('../config/dbConfig'); // import your Sequelize instance
// const { sequelize } = require('./models'); // adjust the import as needed
const initModels = require('../models/init-models');
const { generateMetadata } = require('../scripts/generateMetadata');

const { Kiinteistot, Rakennukset, Rakennustiedot_ryhti, Rakennusluokitukset_ryhti, Metadata_rakennus } = initModels(sequelize);



const getAllKiinteistot = async (page = 1, pageSize = 2) => {
  const offset = (page - 1) * pageSize;

  const { count, rows } = await Kiinteistot.findAndCountAll({
    limit: pageSize,
    offset,
    order: [['id_kiinteisto', 'ASC']], // Adjust sorting as needed
  });

  return {
    totalItems: count,
    totalPages: Math.ceil(count / pageSize),
    currentPage: page,
    items: rows,
  };
};


const getKiinteistoWholeById = async (id_kiinteisto) => {
  const kiinteisto = await Kiinteistot.findOne({ where: { id_kiinteisto } });
  if (!kiinteisto) return null;

  const rakennukset = await Rakennukset.findAll({ where: { id_kiinteisto } });

  const enrichedRakennukset = await Promise.all(
    rakennukset.map(async rakennus => {
      const rakennustiedot = await Rakennustiedot_ryhti.findAll({
        where: { id_rakennus: rakennus.id_rakennus }
      });

      const rakennusluokitukset = await Rakennusluokitukset_ryhti.findAll({
        where: { rakennus_id: rakennus.id_rakennus }
      });

      return {
        ...rakennus.dataValues, // or just rakennus if not using Sequelize
        rakennustiedot,
        rakennusluokitukset,
      };
    })
  );

  return {
    ...kiinteisto.dataValues,
    rakennukset: enrichedRakennukset,
  };
};


const getKiinteistoById = async (id) => {
  return await Kiinteistot.findByPk(id);
};

const createKiinteisto = async (data) => {
  return await Kiinteistot.create(data);
};


const createKiinteistoWhole = async (kiinteistodata, rakennusdataArray) => {
  const transaction = await sequelize.transaction();
  
  try {
    const newKiinteisto = await Kiinteistot.create(kiinteistodata, { transaction });

    const newRakennukset = await Promise.all(
      rakennusdataArray.map(data =>
        Rakennukset.create(
          { ...data, id_kiinteisto: newKiinteisto.id_kiinteisto },
          { transaction }
        )
      )
    );

    const rakennustiedotPromises = [];
    newRakennukset.forEach((rakennus, index) => {
      const rakennustiedotArray = rakennusdataArray[index].rakennustiedotArray || [];
      rakennustiedotArray.forEach(tieto => {
        rakennustiedotPromises.push(
          Rakennustiedot_ryhti.create(
            { ...tieto, id_rakennus: rakennus.id_rakennus },
            { transaction }
          )
        );
      });
    });
    const newRakennustiedot = await Promise.all(rakennustiedotPromises);

    const rakennusluokituksetPromises = [];
    newRakennukset.forEach((rakennus, index) => {
      const rakennusluokituksetArray = rakennusdataArray[index].rakennusluokituksetArray || [];
      rakennusluokituksetArray.forEach(luokitus => {
        rakennusluokituksetPromises.push(
          Rakennusluokitukset_ryhti.create(
            { ...luokitus, rakennus_id: rakennus.id_rakennus },
            { transaction }
          )
        );
      });
    });
    const newRakennusluokitukset = await Promise.all(rakennusluokituksetPromises);

      await Promise.all(newRakennukset.map((rakennus, index) => {
        const metadata = generateMetadata(rakennusdataArray[index]);
        if (metadata) {
          return Metadata_rakennus.create({
            id_rakennus: rakennus.id_rakennus, // or rakennus_id, depending on your model
            metadata
          }, { transaction });
        }
        return Promise.resolve(); // no-op
    }));

    await transaction.commit();

    return {
      newKiinteisto,
      newRakennukset,
      newRakennustiedot,
      newRakennusluokitukset
    };

  } catch (error) {
    await transaction.rollback();
    throw error; // Let your controller or middleware catch and respond
  }
};

const updateKiinteisto = async (id, data) => {
  const kiinteisto = await Kiinteistot.findByPk(id);
  if (!kiinteisto) {
    throw new Error('Kiinteisto not found');
  }
  return await kiinteisto.update(data);
};

const deleteKiinteisto = async (id) => {
  const kiinteisto = await Kiinteistot.findByPk(id);
  if (!kiinteisto) {
    throw new Error('Kiinteisto not found');
  }
  return await kiinteisto.destroy();
};

module.exports = {
  getAllKiinteistot,
  getKiinteistoWholeById,
  getKiinteistoById,
  createKiinteisto,
  createKiinteistoWhole,
  updateKiinteisto,
  deleteKiinteisto,
};