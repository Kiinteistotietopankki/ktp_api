var DataTypes = require("sequelize").DataTypes;
var _huoneistot = require("./huoneistot");
var _kiinteistot = require("./kiinteistot");
var _lokitus = require("./lokitus");
var _lookup_julkisivumateriaali = require("./lookup_julkisivumateriaali");
var _lookup_kayttotilanne = require("./lookup_kayttotilanne");
var _lookup_lammitysenergialahde = require("./lookup_lammitysenergialahde");
var _lookup_lammitystapa = require("./lookup_lammitystapa");
var _lookup_rakennusaine = require("./lookup_rakennusaine");
var _lookup_rakennusluokitus = require("./lookup_rakennusluokitus");
var _lookup_rakentamistapa = require("./lookup_rakentamistapa");
var _metadata_rakennus = require("./metadata_rakennus");
var _rakennukset = require("./rakennukset");
var _rakennusluokitukset_ryhti = require("./rakennusluokitukset_ryhti");
var _rakennustiedot_ryhti = require("./rakennustiedot_ryhti");

function initModels(sequelize) {
  var huoneistot = _huoneistot(sequelize, DataTypes);
  var kiinteistot = _kiinteistot(sequelize, DataTypes);
  var lokitus = _lokitus(sequelize, DataTypes);
  var lookup_julkisivumateriaali = _lookup_julkisivumateriaali(sequelize, DataTypes);
  var lookup_kayttotilanne = _lookup_kayttotilanne(sequelize, DataTypes);
  var lookup_lammitysenergialahde = _lookup_lammitysenergialahde(sequelize, DataTypes);
  var lookup_lammitystapa = _lookup_lammitystapa(sequelize, DataTypes);
  var lookup_rakennusaine = _lookup_rakennusaine(sequelize, DataTypes);
  var lookup_rakennusluokitus = _lookup_rakennusluokitus(sequelize, DataTypes);
  var lookup_rakentamistapa = _lookup_rakentamistapa(sequelize, DataTypes);
  var metadata_rakennus = _metadata_rakennus(sequelize, DataTypes);
  var rakennukset = _rakennukset(sequelize, DataTypes);
  var rakennusluokitukset_ryhti = _rakennusluokitukset_ryhti(sequelize, DataTypes);
  var rakennustiedot_ryhti = _rakennustiedot_ryhti(sequelize, DataTypes);

  rakennukset.belongsTo(kiinteistot, { as: "id_kiinteisto_kiinteistot", foreignKey: "id_kiinteisto"});
  kiinteistot.hasMany(rakennukset, { as: "rakennuksets", foreignKey: "id_kiinteisto"});
  huoneistot.belongsTo(rakennukset, { as: "id_rakennus_rakennukset", foreignKey: "id_rakennus"});
  rakennukset.hasMany(huoneistot, { as: "huoneistots", foreignKey: "id_rakennus"});
  metadata_rakennus.belongsTo(rakennukset, { as: "id_rakennus_rakennukset", foreignKey: "id_rakennus"});
  rakennukset.hasMany(metadata_rakennus, { as: "metadata_rakennus", foreignKey: "id_rakennus"});
  rakennusluokitukset_ryhti.belongsTo(rakennukset, { as: "rakennu", foreignKey: "rakennus_id"});
  rakennukset.hasMany(rakennusluokitukset_ryhti, { as: "rakennusluokitukset_ryhtis", foreignKey: "rakennus_id"});
  rakennustiedot_ryhti.belongsTo(rakennukset, { as: "id_rakennus_rakennukset", foreignKey: "id_rakennus"});
  rakennukset.hasMany(rakennustiedot_ryhti, { as: "rakennustiedot_ryhtis", foreignKey: "id_rakennus"});

  return {
    huoneistot,
    kiinteistot,
    lokitus,
    lookup_julkisivumateriaali,
    lookup_kayttotilanne,
    lookup_lammitysenergialahde,
    lookup_lammitystapa,
    lookup_rakennusaine,
    lookup_rakennusluokitus,
    lookup_rakentamistapa,
    metadata_rakennus,
    rakennukset,
    rakennusluokitukset_ryhti,
    rakennustiedot_ryhti,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
