const sequelize = require('../config/dbConfig'); // import your Sequelize instance
const initModels = require('../models/init-models');

const { row_metadata, rakennukset, rakennusluokitukset_ryhti, rakennustiedot_ryhti } = initModels(sequelize);


const create = async (data) => {
  const { table_name, row_id } = data;

  let model;

  switch (table_name) {
    case 'rakennukset':
      model = rakennukset;
      break;
    case 'rakennustiedot_ryhti':
      model = rakennustiedot_ryhti;;
      break;
    case 'rakennusluokitukset_ryhti':
      model = rakennusluokitukset_ryhti;
      break;
    default:
      throw new Error(`Unsupported table_name: ${table_name}`);
  }

  const referencedRow = await model.findByPk(row_id);

  if (!referencedRow) {
    throw new Error(`Referenced row with ID ${row_id} not found in ${table_name}`);
  }

  return row_metadata.create(data);
};

const findById = async (id) => row_metadata.findByPk(id);

const findByTableAndRow = async (table_name, row_id) => {
  return row_metadata.findOne({ where: { table_name, row_id } });
};

const update = async (id, data) => {
  const item = await row_metadata.findByPk(id);
  if (!item) return null;
  return item.update(data);
};

const updateByTableAndRow = async (table_name, row_id, data) => {
  // Find the metadata row by table_name and row_id
  const item = await row_metadata.findOne({ where: { table_name, row_id } });
  if (!item) return null;

  if (data.metadata) {
    const existingMetadata = item.metadata || {};
    // Merge existing metadata with new metadata (shallow merge)
    const newMetadata = { ...existingMetadata, ...data.metadata };
    data.metadata = newMetadata;
  }

  return item.update(data);
};

const remove = async (id) => {
  const item = await row_metadata.findByPk(id);
  if (!item) return null;
  return item.destroy();
};

module.exports = {
  create,
  findById,
  findByTableAndRow,
  update,
  remove,
  updateByTableAndRow
};