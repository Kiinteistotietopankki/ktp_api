const sequelize = require('../config/dbConfig'); // import your Sequelize instance
const initModels = require('../models/init-models');


const { rakennustiedot_ryhti } = initModels(sequelize);


const findRakennustiedotById_Rakennus = async (id_rakennus) => {
  return await rakennustiedot_ryhti.findAll({
    where: { id_rakennus: id_rakennus }
  });
};


const updateRakennustiedot = async (id, data) => {
  const rakennus = await rakennustiedot.findByPk(id);
  if (!rakennus) {
    throw new Error('Rakennus not found');
  }
  return await rakennus.update(data);
};

module.exports = {
  findRakennustiedotById_Rakennus,
  updateRakennustiedot
};
