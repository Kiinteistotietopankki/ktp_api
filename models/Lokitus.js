const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lokitus', {
    id_loki: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pvm: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timeStampUTC: {
      type: DataTypes.DATE,
      allowNull: false
    },
    timeStampFinnish: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    responseField: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'lokitus',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_loki" },
        ]
      },
    ]
  });
};
