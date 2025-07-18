const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const PTSProject = sequelize.define('pts_projects', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    kiinteistotunnus: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'pts_projects',
    timestamps: false
  });

  const PTSEntry = sequelize.define('pts_entries', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    id_pts_project: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    section: {
      type: DataTypes.STRING,
      allowNull: true
    },
    label: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kl_rating: {
      type: DataTypes.STRING,
      allowNull: true
    },
    values_by_year: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {}
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'pts_entries',
    timestamps: false
  });

  // Define relationships
  PTSProject.hasMany(PTSEntry, {
    foreignKey: 'id_pts_project',
    as: 'entries',
    onDelete: 'CASCADE'
  });

  PTSEntry.belongsTo(PTSProject, {
    foreignKey: 'id_pts_project',
    as: 'project'
  });

  return {
    PTSProject,
    PTSEntry
  };
};
