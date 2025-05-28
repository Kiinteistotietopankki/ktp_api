const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');  // adjust path as needed

const Kiinteisto = sequelize.define('Kiinteisto', {
  id_kiinteisto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,    // assuming it's auto-incrementing
  },
  kiinteistotunnus: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true             // if this should be unique
  }
}, {
  tableName: 'Kiinteistot', // explicit table name if not pluralized automatically
  timestamps: false         // if you don't have createdAt/updatedAt columns
});

module.exports = Kiinteisto;