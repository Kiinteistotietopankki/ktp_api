const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rakennusluokitukset_ryhti', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Primary Key"
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Create Time"
    },
    rakennus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Foreign key",
      references: {
        model: 'Rakennukset',
        key: 'id_rakennus'
      }
    },
    rakennusluokitus: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    runkotapa: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    kayttotilanne: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    julkisivumateriaali: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    lammitystapa: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    lammitysenergialahde: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    rakennusaine: {
      type: DataTypes.STRING(2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Rakennusluokitukset_ryhti',
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
        name: "rakennus_id",
        using: "BTREE",
        fields: [
          { name: "rakennus_id" },
        ]
      },
    ]
  });
};
