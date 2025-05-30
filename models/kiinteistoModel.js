

module.exports = (sequelize, DataTypes) => {

  const Kiinteisto = sequelize.define('Kiinteisto', {
    id_kiinteisto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kiinteistotunnus: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'Kiinteistot',
    timestamps: false,
  });

  Kiinteisto.associate = (models) => {
    Kiinteisto.hasMany(models.Rakennus, {
      foreignKey: 'id_kiinteisto',
      as: 'rakennukset',
    });
  };

  return Kiinteisto;
};