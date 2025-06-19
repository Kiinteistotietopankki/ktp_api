const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('metadata_rakennus', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true
    },
    id_rakennus: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'rakennukset',
        key: 'id_rakennus'
      }
    }
  }, {
    sequelize,
    tableName: 'metadata_rakennus',
    timestamps: true,
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
