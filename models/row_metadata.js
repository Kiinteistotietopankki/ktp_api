const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('row_metadata', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Unique metadata entry ID"
    },
    table_name: {
      type: DataTypes.ENUM('rakennukset_full'),
      allowNull: false,
      comment: "Target table name"
    },
    row_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "ID of the row in the target table"
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: "JSON metadata for the row (e.g., field-wise info)"
    }
  }, {
    sequelize,
    tableName: 'row_metadata',
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
        name: "idx_table_row",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "table_name" },
          { name: "row_id" },
        ]
      },
    ]
  });
};
