const sequelize = require('../config/dbConfig'); // import your Sequelize instance
const initModels = require('../models/init-models');


const { rakennusluokitukset_ryhti } = initModels(sequelize);
const rakennusKoodit = require('../utils/rakennusKoodit.js')


const findRakennuluokituksetById_Rakennus = async (id_rakennus) => {
  const rawRows = await rakennusluokitukset_ryhti.findAll({
    where: { rakennus_id: id_rakennus }
  });

  // Map each row through the decoder function
  const decodedRows = rawRows.map(row => decodeRakennusLuokitukset(row.dataValues));

  return decodedRows;
};


const updateRakennusluokitukset = async (rakennus_id, updateFields) => {
  const rakennus = await rakennusluokitukset_ryhti.findOne({
    where: { rakennus_id }
  });

  if (!rakennus) {
    throw new Error('Rakennus not found');
  }

  return await rakennus.update(updateFields);
};

/**
 * Decode a rakennusluokitukset record, replacing code fields with strings.
 * @param {Object} row - The raw rakennusluokitukset row with code fields.
 * @returns {Object} - A copy of the row with decoded string fields.
 */
function decodeRakennusLuokitukset(row) {

  // Create a shallow copy to avoid mutating original
  const decoded = { ...row };

  // Map of your field names to the corresponding rakennusKoodit keys
  const codeFieldsMap = {
    rakennusluokitus: 'rakennusluokitus',
    runkotapa: 'rakentamistapa',  // add this mapping
    kayttotilanne: 'kayttotilanne',
    julkisivumateriaali: 'julkisivumateriaali',
    lammitystapa: 'lammitystapa',
    lammitysenergialahde: 'lammitysenergialahde',
    rakennusaine: 'rakennusaine',
  };

  // For each field, replace the code with the human-readable string if found
  for (const [fieldName, codeKey] of Object.entries(codeFieldsMap)) {

    if (decoded[fieldName]) {

      if (rakennusKoodit[codeKey]) {
        const decodedValue = rakennusKoodit[codeKey][decoded[fieldName]];

        decoded[fieldName] = decodedValue || decoded[fieldName];
      }
    }
  }
  return decoded;
}

module.exports = {
  findRakennuluokituksetById_Rakennus,
  updateRakennusluokitukset
};
