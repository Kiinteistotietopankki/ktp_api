const fs = require('fs');
const path = require('path');
const { SchemaManager, OpenApiStrategy } = require('@techntools/sequelize-to-openapi');
const sequelize = require('../config/dbConfig');
const models = require('../models/init-models')(sequelize);

const schemaManager = new SchemaManager();
const strategy = new OpenApiStrategy({ additionalProperties: false });

const schemasDir = path.join(__dirname, '../schemas');
if (!fs.existsSync(schemasDir)) {
  fs.mkdirSync(schemasDir);
}

for (const modelName in models) {
  const model = models[modelName];

  // Generate full schema (response schema)
  const fullSchema = schemaManager.generate(model, strategy, { associations: true });

  // Write full schema to file
  const fullFilePath = path.join(schemasDir, `${modelName}.json`);
  fs.writeFileSync(fullFilePath, JSON.stringify(fullSchema, null, 2));
  console.log(`✅ Full schema created for model: ${modelName}`);

  // Generate "create" schema by cloning and removing primary key fields
  const createSchema = JSON.parse(JSON.stringify(fullSchema));

  // Remove primary key properties from createSchema
  for (const attrName in model.rawAttributes) {
    const attribute = model.rawAttributes[attrName];
    if (attribute.primaryKey) {
      // Remove from required list if present
      if (Array.isArray(createSchema.required)) {
        createSchema.required = createSchema.required.filter(r => r !== attrName);
      }
      // Remove property from schema properties
      if (createSchema.properties && createSchema.properties[attrName]) {
        delete createSchema.properties[attrName];
      }
    }
  }

  // Save create schema to separate file
  const createFilePath = path.join(schemasDir, `${modelName}_create.json`);
  fs.writeFileSync(createFilePath, JSON.stringify(createSchema, null, 2));
  console.log(`✅ Create schema created for model: ${modelName}`);
}