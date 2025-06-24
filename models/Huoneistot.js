const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('huoneistot', {
    id_huoneisto: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
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
    tableName: 'huoneistot',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_huoneisto" },
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
