#!/usr/bin/env node

const fs = require('fs');
const path = require('path');


if (process.argv.length < 3) {
  console.error('Usage: node generateRoutes.js <controllerFile> <baseRoute>');
  process.exit(1);
}

const controllerFile = process.argv[2];
const baseRoute = process.argv[3] ? process.argv[3].replace(/\/+$/, '') : ''; // remove trailing slash if provided

// Read controller file source as text
const controllerPath = path.isAbsolute(controllerFile)
  ? controllerFile
  : path.join(process.cwd(), controllerFile);

if (!fs.existsSync(controllerPath)) {
  console.error(`Controller file does not exist: ${controllerPath}`);
  process.exit(1);
}

const controllerSource = fs.readFileSync(controllerPath, 'utf-8');

// Helper: extract all exported async functions and their code bodies
function extractExportedFunctions(src) {
  // Simple regex to match exports.funcName = async (req, res) => { ... }
  const regex = /exports\.(\w+)\s*=\s*async\s*\(req,\s*res\)\s*=>\s*\{([\s\S]*?)^\};/gm;
  const funcs = {};
  let match;
  while ((match = regex.exec(src)) !== null) {
    const funcName = match[1];
    const funcBody = match[2];
    funcs[funcName] = funcBody;
  }
  return funcs;
}

// Infer param type from usage in code snippet, very basic heuristics
function inferParamType(paramName, funcBody) {
  // Look for parseInt(req.query.<paramName>) => integer
  const intRegex = new RegExp(`parseInt\\(\\s*req\\.query\\.${paramName}\\s*\\)`);
  if (intRegex.test(funcBody)) return 'integer';

  // Look for req.query.<paramName> used as string (default)
  // Could add boolean detection later, for now string
  return 'string';
}

// Extract query params used in the function body
function extractQueryParams(funcBody) {
  // Matches req.query.<paramName>
  const paramRegex = /req\.query\.([a-zA-Z0-9_]+)/g;
  const params = new Set();
  let m;
  while ((m = paramRegex.exec(funcBody)) !== null) {
    params.add(m[1]);
  }
  return Array.from(params);
}

const exportedFuncs = extractExportedFunctions(controllerSource);

if (Object.keys(exportedFuncs).length === 0) {
  console.error('No exported async functions found in controller file');
  process.exit(1);
}

const expressImportPath = path.relative(path.join(process.cwd(), 'routes'), controllerPath).replace(/\\/g, '/');

let output = `const express = require('express');
const router = express.Router();
const controller = require('${expressImportPath}');
`;

// Helper to indent Swagger params block
function buildSwaggerParams(params) {
  if (params.length === 0) return '';

  return ' *     parameters:\n' + params.map(p => {
    return ` *       - in: query
 *         name: ${p.name}
 *         required: false
 *         schema:
 *           type: ${p.type}`;
  }).join('\n');
}
// Convert camelCase function name to kebab-case for route paths
function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

for (const [funcName, funcBody] of Object.entries(exportedFuncs)) {
  const paramNames = extractQueryParams(funcBody);
  const params = paramNames.map(name => ({
    name,
    type: inferParamType(name, funcBody),
  }));

  const routePath = baseRoute ? `${baseRoute}/${toKebabCase(funcName)}` : `/${toKebabCase(funcName)}`;

  const swaggerParamsBlock = buildSwaggerParams(params);

  output += `
/**
 * @swagger
 * ${routePath}:
 *   get:
 *     summary: ${funcName} (auto-generated route)
 *     tags:
 *       - Generated
${swaggerParamsBlock ? swaggerParamsBlock : ''}
 *     responses:
 *       200:
 *         description: JSON data returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('controller.${funcName});
`;
}

output += `

module.exports = router;
`;

const outDir = path.join(process.cwd(), 'routes');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// Get controller base name without extension
const controllerBaseName = path.basename(controllerFile, '.js').replace(/Controller$/, '');
// Build output filename by adding 'Routes.js'
const outFileName = controllerBaseName + 'Routes.js';

const outFile = path.join(outDir, outFileName);
fs.writeFileSync(outFile, output);

console.log(`Generated routes file saved to ${outFile}`);