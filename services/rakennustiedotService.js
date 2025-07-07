const sequelize = require('../config/dbConfig'); // import your Sequelize instance
const initModels = require('../models/init-models');


const { rakennustiedot_ryhti } = initModels(sequelize);


const findRakennustiedotById_Rakennus = async (id_rakennus) => {
  return await rakennustiedot_ryhti.findOne({
    where: { id_rakennus: id_rakennus }
  });
};


const updateRakennustiedot = async (id_rakennus, updateFields) => {
  const rakennus = await rakennustiedot_ryhti.findOne({
    where: { id_rakennus }
  });

  if (!rakennus) {
    throw new Error('Rakennus not found');
  }

  return await rakennus.update(updateFields);
};

module.exports = {
  findRakennustiedotById_Rakennus,
  updateRakennustiedot
};
