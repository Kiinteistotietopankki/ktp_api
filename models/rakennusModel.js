

module.exports = (sequelize, DataTypes) => {

  const Rakennus = sequelize.define('Rakennus', {
    id_rakennus: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_kiinteisto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Kiinteisto',   // This refers to the model name defined in Kiinteisto model
        key: 'id_kiinteisto',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    rakennustunnus: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    osoite: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    toimipaikka: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    postinumero: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'Rakennukset',
    timestamps: false,
  });

  Rakennus.associate = (models) => {
    Rakennus.belongsTo(models.Kiinteisto, {
      foreignKey: 'id_kiinteisto',
      as: 'kiinteisto',
    });
  };

  return Rakennus;
};
