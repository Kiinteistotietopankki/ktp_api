var DataTypes = require("sequelize").DataTypes;
var _Huoneistot = require("./Huoneistot");
var _Kiinteistot = require("./Kiinteistot");
var _Lokitus = require("./Lokitus");
var _Metadata_rakennus = require("./Metadata_rakennus");
var _Rakennukset = require("./Rakennukset");
var _Rakennusluokitukset_ryhti = require("./Rakennusluokitukset_ryhti");
var _Rakennustiedot_ryhti = require("./Rakennustiedot_ryhti");
var _lookup_julkisivumateriaali = require("./lookup_julkisivumateriaali");
var _lookup_kayttotilanne = require("./lookup_kayttotilanne");
var _lookup_lammitysenergialahde = require("./lookup_lammitysenergialahde");
var _lookup_lammitystapa = require("./lookup_lammitystapa");
var _lookup_rakennusaine = require("./lookup_rakennusaine");
var _lookup_rakennusluokitus = require("./lookup_rakennusluokitus");
var _lookup_rakentamistapa = require("./lookup_rakentamistapa");

function initModels(sequelize) {
  var Huoneistot = _Huoneistot(sequelize, DataTypes);
  var Kiinteistot = _Kiinteistot(sequelize, DataTypes);
  var Lokitus = _Lokitus(sequelize, DataTypes);
  var Metadata_rakennus = _Metadata_rakennus(sequelize, DataTypes);
  var Rakennukset = _Rakennukset(sequelize, DataTypes);
  var Rakennusluokitukset_ryhti = _Rakennusluokitukset_ryhti(sequelize, DataTypes);
  var Rakennustiedot_ryhti = _Rakennustiedot_ryhti(sequelize, DataTypes);
  var lookup_julkisivumateriaali = _lookup_julkisivumateriaali(sequelize, DataTypes);
  var lookup_kayttotilanne = _lookup_kayttotilanne(sequelize, DataTypes);
  var lookup_lammitysenergialahde = _lookup_lammitysenergialahde(sequelize, DataTypes);
  var lookup_lammitystapa = _lookup_lammitystapa(sequelize, DataTypes);
  var lookup_rakennusaine = _lookup_rakennusaine(sequelize, DataTypes);
  var lookup_rakennusluokitus = _lookup_rakennusluokitus(sequelize, DataTypes);
  var lookup_rakentamistapa = _lookup_rakentamistapa(sequelize, DataTypes);

  Rakennukset.belongsTo(Kiinteistot, { as: "id_kiinteisto_Kiinteistot", foreignKey: "id_kiinteisto"});
  Kiinteistot.hasMany(Rakennukset, { as: "Rakennuksets", foreignKey: "id_kiinteisto"});
  Huoneistot.belongsTo(Rakennukset, { as: "id_rakennus_Rakennukset", foreignKey: "id_rakennus"});
  Rakennukset.hasMany(Huoneistot, { as: "Huoneistots", foreignKey: "id_rakennus"});
  Rakennusluokitukset_ryhti.belongsTo(Rakennukset, { as: "rakennu", foreignKey: "rakennus_id"});
  Rakennukset.hasMany(Rakennusluokitukset_ryhti, { as: "Rakennusluokitukset_ryhtis", foreignKey: "rakennus_id"});
  Rakennustiedot_ryhti.belongsTo(Rakennukset, { as: "id_rakennus_Rakennukset", foreignKey: "id_rakennus"});
  Rakennukset.hasMany(Rakennustiedot_ryhti, { as: "Rakennustiedot_ryhtis", foreignKey: "id_rakennus"});
  Metadata_rakennus.belongsTo(Rakennusluokitukset_ryhti, { as: "id_rakennus_Rakennusluokitukset_ryhti", foreignKey: "id_rakennus"});
  Rakennusluokitukset_ryhti.hasMany(Metadata_rakennus, { as: "Metadata_rakennus", foreignKey: "id_rakennus"});

  return {
    Huoneistot,
    Kiinteistot,
    Lokitus,
    Metadata_rakennus,
    Rakennukset,
    Rakennusluokitukset_ryhti,
    Rakennustiedot_ryhti,
    lookup_julkisivumateriaali,
    lookup_kayttotilanne,
    lookup_lammitysenergialahde,
    lookup_lammitystapa,
    lookup_rakennusaine,
    lookup_rakennusluokitus,
    lookup_rakentamistapa,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
