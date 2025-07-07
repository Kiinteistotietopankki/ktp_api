const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rakennukset_full', {
    id_rakennus: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    id_kiinteisto: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'kiinteistot',
        key: 'id_kiinteisto'
      }
    },
    rakennustunnus: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
    osoite: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    toimipaikka: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    postinumero: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rakennusvuosi: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    kokonaisala: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    kerrosala: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    huoneistoala: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    tilavuus: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    kerroksia: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    sijainti: {
      type: DataTypes.GEOMETRY('POINT'), 
      allowNull: true
    },
    rakennusluokitus: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    runkotapa: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    kayttotilanne: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    julkisivumateriaali: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lammitystapa: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lammitysenergialahde: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rakennusaine: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'rakennukset_full',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_rakennus" },
        ]
      },
      {
        name: "idx_id_kiinteisto",
        using: "BTREE",
        fields: [
          { name: "id_kiinteisto" },
        ]
      },
    ]
  });
};
