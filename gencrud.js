const fs = require('fs');
const path = require('path');

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function readSchemas(schemaDir) {
  return fs.readdirSync(schemaDir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({
      name: f.replace('.json', ''),
      path: path.join(schemaDir, f),
      schema: JSON.parse(fs.readFileSync(path.join(schemaDir, f), 'utf8'))
    }));
}

function extractSwaggerProperties(schema) {
  if (!schema.properties) return {};
  const props = {};
  for (const [key, val] of Object.entries(schema.properties)) {
    props[key] = { type: val.type || 'string' };
  }
  return props;
}

function swaggerSchemaProperties(swaggerProps) {
  let str = '';
  for (const [key, val] of Object.entries(swaggerProps)) {
    str += ` *         ${key}:\n *           type: ${val.type}\n`;
  }
  return str;
}

function generateRoutes(resource, swaggerProps, createSchemaUsed) {
  const Resource = capitalize(resource);
  const CreateSchemaName = `${Resource}_create`;

  return `const express = require('express');
const router = express.Router();
const ${resource}Controller = require('../controllers/${resource}Controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     ${Resource}:
 *       type: object
 *       properties:
${swaggerSchemaProperties(swaggerProps)}
 *     ${CreateSchemaName}:
 *       type: object
 *       properties:
${swaggerSchemaProperties(createSchemaUsed)}
 *
 * /api/${resource}:
 *   get:
 *     summary: Get all ${resource}
 *     tags: [${Resource}]
 *     responses:
 *       200:
 *         description: List of all ${resource}
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/${Resource}'
 */
router.get('/', ${resource}Controller.getAll);

/**
 * @swagger
 * /api/${resource}/by/{id}:
 *   get:
 *     summary: Get a single ${resource} by ID
 *     tags: [${Resource}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single ${resource}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${Resource}'
 */
router.get('/by/:id', ${resource}Controller.getById);

/**
 * @swagger
 * /api/${resource}:
 *   post:
 *     summary: Create a new ${resource}
 *     tags: [${Resource}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/${CreateSchemaName}'
 *     responses:
 *       201:
 *         description: Created ${resource}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${Resource}'
 */
router.post('/', ${resource}Controller.create);

/**
 * @swagger
 * /api/${resource}/{id}:
 *   put:
 *     summary: Update an existing ${resource} by ID
 *     tags: [${Resource}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/${CreateSchemaName}'
 *     responses:
 *       200:
 *         description: Updated ${resource}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${Resource}'
 */
router.put('/:id', ${resource}Controller.update);

/**
 * @swagger
 * /api/${resource}/{id}:
 *   delete:
 *     summary: Delete a ${resource} by ID
 *     tags: [${Resource}]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted ${resource}
 */
router.delete('/:id', ${resource}Controller.remove);

module.exports = router;
`;
}

function generateController(resource) {
  const Resource = capitalize(resource);

  return `const ${resource}Service = require('../services/${resource}Service');

exports.getAll = async (req, res) => {
  try {
    const items = await ${resource}Service.getAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await ${resource}Service.getById(req.params.id);
    if (!item) return res.status(404).json({ message: '${Resource} not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const created = await ${resource}Service.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await ${resource}Service.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: '${Resource} not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await ${resource}Service.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: '${Resource} not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
`;
}

function generateService(resource) {
  const Resource = capitalize(resource);

  return `const sequelize = require('../config/dbConfig');
const initModels = require('../models/init-models');

const { ${resource} } = initModels(sequelize);

class ${Resource}Service {
  async getAll() {
    return ${resource}.findAll();
  }

  async getById(id) {
    return ${resource}.findByPk(id);
  }

  async create(data) {
    return ${resource}.create(data);
  }

  async update(id, data) {
    const item = await ${resource}.findByPk(id);
    if (!item) throw new Error('${Resource} not found');
    return item.update(data);
  }

  async remove(id) {
    const item = await ${resource}.findByPk(id);
    if (!item) throw new Error('${Resource} not found');
    return item.destroy();
  }
}

module.exports = new ${Resource}Service();
`;
}

// Main generation function
function generateAllFromSchemas(schemaDir) {
  const schemas = readSchemas(schemaDir);

  const baseSchemas = {};
  const createSchemas = {};

  schemas.forEach(({ name, schema }) => {
    if (name.endsWith('_create')) {
      createSchemas[name.replace('_create', '')] = schema;
    } else {
      baseSchemas[name] = schema;
    }
  });

  const routesPath = path.join(__dirname, 'routes');
  const controllersPath = path.join(__dirname, 'controllers');
  const servicesPath = path.join(__dirname, 'services');

  if (!fs.existsSync(routesPath)) fs.mkdirSync(routesPath);
  if (!fs.existsSync(controllersPath)) fs.mkdirSync(controllersPath);
  if (!fs.existsSync(servicesPath)) fs.mkdirSync(servicesPath);

  for (const [name, baseSchema] of Object.entries(baseSchemas)) {
    const swaggerProps = extractSwaggerProperties(baseSchema);
    const createSchema = createSchemas[name];
    const createProps = extractSwaggerProperties(createSchema || {});

    const filesToGenerate = [
      {
        path: path.join(routesPath, `${name}Routes.js`),
        content: generateRoutes(name, swaggerProps, createProps),
        label: 'Route',
      },
      {
        path: path.join(controllersPath, `${name}Controller.js`),
        content: generateController(name),
        label: 'Controller',
      },
      {
        path: path.join(servicesPath, `${name}Service.js`),
        content: generateService(name),
        label: 'Service',
      },
    ];

    let alreadyExists = false;

    for (const file of filesToGenerate) {
      if (fs.existsSync(file.path)) {
        console.log(`⚠️  ${file.label} file already exists for: ${name}, skipping.`);
        alreadyExists = true;
      } else {
        fs.writeFileSync(file.path, file.content, 'utf8');
      }
    }

    if (!alreadyExists) {
      console.log(`✅ Generated CRUD files for resource: ${name}`);
    }
  }
}

// Run the generation
const schemaFolder = path.join(__dirname, 'schemas');
generateAllFromSchemas(schemaFolder);
