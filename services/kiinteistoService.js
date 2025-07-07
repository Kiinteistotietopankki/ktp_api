const sequelize = require('../config/dbConfig'); // import your Sequelize instance
// const { sequelize } = require('./models'); // adjust the import as needed
const initModels = require('../models/init-models');
const { generateMetadata } = require('../scripts/generateMetadata');

const {kiinteistot, rakennukset, rakennustiedot_ryhti, rakennusluokitukset_ryhti, metadata_rakennus } = initModels(sequelize);
const { Op } = require('sequelize');

const { findRakennusByKiinteistoId } = require('./rakennusService.js')
const { findRakennustiedotById_Rakennus } = require('./rakennustiedotService.js')
const { findRakennuluokituksetById_Rakennus } = require('./rakennusluokituksetService.js')


const findKiinteistoWRakennus = async (id_kiinteisto) => {
  const kiinteisto = await kiinteistot.findByPk(id_kiinteisto);
  const rakennukset = await findRakennusByKiinteistoId(id_kiinteisto);

  await Promise.all(
    rakennukset.map(async (rakennus) => {
      const tiedot = await findRakennustiedotById_Rakennus(rakennus.id_rakennus);
      const luokitukset = await findRakennuluokituksetById_Rakennus(rakennus.id_rakennus);

      rakennus.dataValues.rakennustiedot = tiedot;
      rakennus.dataValues.rakennusluokitukset = luokitukset;
    })
  );

  return {
    kiinteisto,
    rakennukset
  };
};



// older

const getAllKiinteistot = async (page = 1, pageSize = 2) => {
  const offset = (page - 1) * pageSize;

  const { count, rows } = await kiinteistot.findAndCountAll({
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

const getAllKiinteistotWithData = async (page = 1, pageSize = 5, order = 'ASC', searchTerm = '') => {
  const offset = (page - 1) * pageSize;

  try {
    let count, rows;

    if (searchTerm.includes('-')) {
      ({ count, rows } = await kiinteistot.findAndCountAll({
        limit: pageSize,
        offset,
        distinct: true,
        order: [['id_kiinteisto', order]],
        where: {
          kiinteistotunnus: searchTerm,
        },
        include: [
          {
            model: rakennukset,
            as: 'rakennuksets', // alias must match association
          },
        ],
      }));
    } else {
      ({ count, rows } = await kiinteistot.findAndCountAll({
        limit: pageSize,
        offset,
        distinct: true,
        order: [['id_kiinteisto', order]],
        include: [
          {
            model: rakennukset,
            as: 'rakennuksets',
            where: {
              [Op.or]: [
                { toimipaikka: { [Op.like]: `%${searchTerm}%` } },
                { osoite: { [Op.like]: `%${searchTerm}%` } },
                { postinumero: { [Op.like]: `%${searchTerm}%` } },
              ],
            },
            required: true,
          },
        ],
      }));
    }

    const enrichedRows = rows.map((kiinteisto) => {
      const rakennus = kiinteisto.rakennuksets?.[0] || null;

      return {
        id_kiinteisto: kiinteisto.id_kiinteisto,
        kiinteistotunnus: kiinteisto.kiinteistotunnus,
        osoite: rakennus?.osoite || null,
        toimipaikka: rakennus?.toimipaikka || null,
        postinumero: rakennus?.postinumero || null,
      };
    });

    return {
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
      items: enrichedRows,
    };

  } catch (error) {
    console.error('Error in getAllKiinteistotWithData:', error);
    throw error; // Re-throw to let caller handle it if needed
  }
};


const getKiinteistoWholeById = async (id_kiinteisto) => {
  const kiinteisto = await kiinteistot.findOne({ where: { id_kiinteisto } });
  if (!kiinteisto) return null;

  const rakennuksetFromDb = await rakennukset.findAll({ where: { id_kiinteisto } });

  const enrichedRakennukset = await Promise.all(
    rakennuksetFromDb.map(async rakennus => {
      const rakennustiedot = await rakennustiedot_ryhti.findAll({
        where: { id_rakennus: rakennus.id_rakennus }
      });

      const rakennusluokitukset = await rakennusluokitukset_ryhti.findAll({
        where: { rakennus_id: rakennus.id_rakennus }
      });

      const metadata = await metadata_rakennus.findAll({
        where: { id_rakennus: rakennus.id_rakennus}
      }) 

      return {
        ...rakennus.dataValues, // or just rakennus if not using Sequelize
        rakennustiedot,
        rakennusluokitukset,
        metadata
      };
    })
  );

  return {
    ...kiinteisto.dataValues,
    rakennukset: enrichedRakennukset,
  };
};

const updateKiinteistoWholeByIdService = async(id_kiinteisto, updatedData) => {
  const { rakennukset, ...kiinteistoFields } = updatedData;

  // Update kiinteisto table (top-level)
  if (Object.keys(kiinteistoFields).length > 0) {
    await kiinteistot.update(kiinteistoFields, { where: { id_kiinteisto } });
  }

  if (rakennukset && rakennukset.length > 0) {
    for (const rakennusUpdate of rakennukset) {
      const { id_rakennus, rakennustiedot, rakennusluokitukset, metadata, ...rakennusFields } = rakennusUpdate;
      if (!id_rakennus) continue;

      // Update rakennus main fields
      if (Object.keys(rakennusFields).length > 0) {
        await rakennukset.update(rakennusFields, { where: { id_rakennus } });
      }

      // Update rakennustiedot array if present
      if (rakennustiedot && rakennustiedot.length > 0) {
        for (const tiedot of rakennustiedot) {
          const { id, ...tiedotFields } = tiedot;
          if (!id) continue;

          await rakennustiedot_ryhti.update(tiedotFields, { where: { id } });
        }
      }

      // Update rakennusluokitukset array if present
      if (rakennusluokitukset && rakennusluokitukset.length > 0) {
        for (const luokitus of rakennusluokitukset) {
          const { id, ...luokitusFields } = luokitus;
          if (!id) continue;

          await rakennusluokitukset_ryhti.update(luokitusFields, { where: { id } });
        }
      }

      // Update metadata array if present
      if (metadata && metadata.length > 0) {
        for (const meta of metadata) {
          const { id, ...metaFields } = meta;
          if (!id) continue;

          await metadata_rakennus.update(metaFields, { where: { id } });
        }
      }
    }
  }
}

const getKiinteistoById = async (id) => {
  return await kiinteistot.findByPk(id);
};

const createKiinteisto = async (data) => {
  return await kiinteistot.create(data);
};


const createKiinteistoWhole = async (kiinteistodata, rakennusdataArray) => {
  const transaction = await sequelize.transaction();
  
  try {
    const newKiinteisto = await kiinteistot.create(kiinteistodata, { transaction });

    const newRakennukset = await Promise.all(
      rakennusdataArray.map(data =>
        rakennukset.create(
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
          rakennustiedot_ryhti.create(
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
          rakennusluokitukset_ryhti.create(
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
          return metadata_rakennus.create({
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
  const kiinteisto = await kiinteistot.findByPk(id);
  if (!kiinteisto) {
    throw new Error('Kiinteisto not found');
  }
  return await kiinteisto.update(data);
};

const deleteKiinteisto = async (id) => {
  const kiinteisto = await kiinteistot.findByPk(id);
  if (!kiinteisto) {
    throw new Error('Kiinteisto not found');
  }
  return await kiinteisto.destroy();
};

module.exports = {
  getAllKiinteistot,
  getAllKiinteistotWithData,
  getKiinteistoWholeById,
  updateKiinteistoWholeByIdService,
  getKiinteistoById,
  createKiinteisto,
  createKiinteistoWhole,
  updateKiinteisto,
  deleteKiinteisto,
  findKiinteistoWRakennus
};