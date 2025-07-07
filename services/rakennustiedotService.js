const sequelize = require('../config/dbConfig'); // import your Sequelize instance
const initModels = require('../models/init-models');


const { rakennustiedot_ryhti } = initModels(sequelize);


const findRakennustiedotById_Rakennus = async (id_rakennus) => {
  return await rakennustiedot_ryhti.findOne({
    where: { id_rakennus: id_rakennus }
  });
};


const updateRakennustiedot = async (
  id,
  {
    rakennusvuosi,
    kokonaisala,
    kerrosala,
    huoneistoala,
    tilavuus,
    kerroksia,
    sijainti
  }
    ) => {
    const rakennus = await rakennustiedot.findByPk(id);
    if (!rakennus) {
        throw new Error('Rakennus not found');
    }

  return await rakennus.update({
    ...(rakennusvuosi !== undefined && { rakennusvuosi }),
    ...(kokonaisala !== undefined && { kokonaisala }),
    ...(kerrosala !== undefined && { kerrosala }),
    ...(huoneistoala !== undefined && { huoneistoala }),
    ...(tilavuus !== undefined && { tilavuus }),
    ...(kerroksia !== undefined && { kerroksia }),
    ...(sijainti !== undefined && { sijainti }),
  });
};

module.exports = {
  findRakennustiedotById_Rakennus,
  updateRakennustiedot
};
