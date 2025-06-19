const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rakennukset', {
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
    tableName: 'rakennukset',
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
        name: "id_kiinteisto",
        using: "BTREE",
        fields: [
          { name: "id_kiinteisto" },
        ]
      },
    ]
  });
};
