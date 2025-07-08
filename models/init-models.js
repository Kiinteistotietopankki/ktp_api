var DataTypes = require("sequelize").DataTypes;
var _kiinteistot = require("./kiinteistot");
var _lokitus = require("./lokitus");
var _rakennukset_full = require("./rakennukset_full");
var _row_metadata = require("./row_metadata");

function initModels(sequelize) {
  var kiinteistot = _kiinteistot(sequelize, DataTypes);
  var lokitus = _lokitus(sequelize, DataTypes);
  var rakennukset_full = _rakennukset_full(sequelize, DataTypes);
  var row_metadata = _row_metadata(sequelize, DataTypes);

  rakennukset_full.belongsTo(kiinteistot, { as: "id_kiinteisto_kiinteistot", foreignKey: "id_kiinteisto"});
  kiinteistot.hasMany(rakennukset_full, { as: "rakennukset_fulls", foreignKey: "id_kiinteisto"});

  return {
    kiinteistot,
    lokitus,
    rakennukset_full,
    row_metadata,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
