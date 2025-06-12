const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rakennustiedot_ryhti', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Primary Key"
    },
    id_rakennus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Foreign key",
      references: {
        model: 'Rakennukset',
        key: 'id_rakennus'
      }
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
    }
  }, {
    sequelize,
    tableName: 'Rakennustiedot_ryhti',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "id_rakennus",
        using: "BTREE",
        fields: [
          { name: "id_rakennus" },
        ]
      },
    ]
  });
};
