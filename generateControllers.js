const fs = require('fs');
const path = require('path');

const reservedKeywords = new Set([
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
  'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 'if',
  'import', 'in', 'instanceof', 'new', 'return', 'super', 'switch', 'this', 'throw',
  'try', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'let', 'static', 'await'
]);

function isValidIdentifier(name) {
  // simple regex for valid JS identifier names
  return /^[A-Za-z$_][A-Za-z0-9$_]*$/.test(name) && !reservedKeywords.has(name);
}

function sanitizeParamName(param) {
  // Remove all invalid characters and leading non-letters/underscore/dollar
  let clean = param.replace(/[^\w$]/g, '');
  // If first char not letter/$_, prefix with _
  if (!/^[A-Za-z$_]/.test(clean)) clean = '_' + clean;
  return clean;
}

function parseParams(paramString) {
  if (!paramString.trim()) return [];
  return paramString
    .split(',')
    .map(p => p.trim().split('=')[0].trim())
    .map(p => p.replace(/[\{\}\[\]\.\.\.]/g, ''))
    .filter(p => p.length > 0)
    .map(sanitizeParamName)
    .filter(isValidIdentifier);
}

function generateParamExtraction(param) {
  if (/id|page|limit|count|number|year/i.test(param)) {
    return `const ${param} = parseInt(req.query.${param}) || 0;`;
  }
  return `const ${param} = req.query.${param} || '';`;
}

function camelCase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node generateControllers.js <service-file-path>');
    process.exit(1);
  }

  const serviceFilePath = path.resolve(args[0]);
  if (!fs.existsSync(serviceFilePath)) {
    console.error(`File not found: ${serviceFilePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(serviceFilePath, 'utf-8');

  const classMatch = content.match(/class\s+([A-Za-z0-9_]+)/);
  if (!classMatch) {
    console.error('No class declaration found.');
    process.exit(1);
  }
  const className = classMatch[1];
  const serviceInstanceName = camelCase(className);

  const methodRegex = /(?:async\s+)?([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/g;

  const methods = [];
  let match;
  while ((match = methodRegex.exec(content)) !== null) {
    const methodName = match[1];
    if (methodName === 'constructor') continue;
    if (!isValidIdentifier(methodName)) {
      console.warn(`Skipping invalid method name: ${methodName}`);
      continue;
    }
    const paramString = match[2];
    const params = parseParams(paramString);
    methods.push({ methodName, params });
  }

  if (methods.length === 0) {
    console.error('No valid methods found in the service class.');
    process.exit(1);
  }

  const controllersDir = path.resolve(__dirname, 'controllers');
  const relativeRequirePath = path.relative(controllersDir, serviceFilePath).replace(/\\/g, '/');
  const requirePath = relativeRequirePath.startsWith('.') ? relativeRequirePath : './' + relativeRequirePath;

  function genController({ methodName, params }) {
    const paramLines = params.map(generateParamExtraction).join('\n    ');
    const callParams = params.join(', ');

    return `
exports.${methodName} = async (req, res) => {
  try {
    ${paramLines ? paramLines : '// no params'}

    const result = await ${serviceInstanceName}.${methodName}(${callParams});
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
`.trim();
  }

  const controllersCode = methods.map(genController).join('\n\n');

  const controllerFileContent = `
// AUTO-GENERATED CONTROLLER for ${className} from ${path.basename(serviceFilePath)}

const ${className} = require('${requirePath}');
const ${serviceInstanceName} = new ${className}();

${controllersCode}
`.trim();

  if (!fs.existsSync(controllersDir)) {
    fs.mkdirSync(controllersDir);
  }

  const outputFileName = path.basename(serviceFilePath, '.js') + 'Controller.js';
  const outputPath = path.join(controllersDir, outputFileName);

  fs.writeFileSync(outputPath, controllerFileContent, 'utf-8');

  console.log(`Controller file generated at: ${outputPath}`);
}

main();
