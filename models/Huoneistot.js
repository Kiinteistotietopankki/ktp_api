const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Huoneistot', {
    id_huoneisto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_rakennus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Rakennukset',
        key: 'id_rakennus'
      }
    }
  }, {
    sequelize,
    tableName: 'Huoneistot',
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
        name: "fk_rakennus",
        using: "BTREE",
        fields: [
          { name: "id_rakennus" },
        ]
      },
    ]
  });
};
