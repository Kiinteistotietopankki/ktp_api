const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kiinteistot', {
    id_kiinteisto: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    kiinteistotunnus: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tontin_koko: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'kiinteistot',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_kiinteisto" },
        ]
      },
    ]
  });
};
