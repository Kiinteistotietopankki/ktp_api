const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Metadata_rakennus', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true
    },
    id_rakennus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Foreign key",
      references: {
        model: 'Rakennukset',
        key: 'id_rakennus'
      }
    }
  }, {
    sequelize,
    tableName: 'Metadata_rakennus',
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
