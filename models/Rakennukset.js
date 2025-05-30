const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rakennukset', {
    id_rakennus: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_kiinteisto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Kiinteistot',
        key: 'id_kiinteisto'
      }
    },
    rakennustunnus: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
    osoite: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    toimipaikka: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    postinumero: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Rakennukset',
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
        name: "fk_kiinteisto",
        using: "BTREE",
        fields: [
          { name: "id_kiinteisto" },
        ]
      },
    ]
  });
};
