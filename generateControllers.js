const fs = require('fs');
const path = require('path');

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

  const fileContent = fs.readFileSync(serviceFilePath, 'utf-8');

  // Extract service class name (optional, not used here but could be logged)
  const classNameMatch = fileContent.match(/class\s+([A-Za-z0-9_]+)/);
  const className = classNameMatch ? classNameMatch[1] : 'Service';

  // Extract methods (skip constructor and methods starting with _)
  const methodRegex = /^\s*(?:async\s+)?([a-zA-Z0-9_]+)\s*\(/gm;
  const methods = [];
  let match;
  while ((match = methodRegex.exec(fileContent)) !== null) {
    const methodName = match[1];
    if (methodName !== 'constructor' && !methodName.startsWith('_')) {
      methods.push(methodName);
    }
  }

  if (methods.length === 0) {
    console.error('No methods found in the service class.');
    process.exit(1);
  }

  // Derive a service variable name in camelCase from class name, or fallback
  function toCamelCase(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
  const serviceInstanceName = toCamelCase(className);

  // Basic param name and param checker function name, you can customize these or pass as args later
  const paramName = 'param';
  const paramCheckerFn = 'tarkistaParam';

  // Generate controller code for one method
  function generateController(method) {
    return `
exports.${method} = async (req, res) => {
  const ${paramName} = ${paramCheckerFn}(req, res);
  if (!${paramName}) return;
  await handleRequest(res, () => ${serviceInstanceName}.${method}(${paramName}));
};
`.trim();
  }

  const controllerFileContent = `
// AUTO-GENERATED CONTROLLERS for ${className} from ${path.basename(serviceFilePath)}

const { ${className} } = require('../services/${path.basename(serviceFilePath, '.js')}');
const ${serviceInstanceName} = new ${className}();

const { ${paramCheckerFn}, handleRequest } = require('../utils/helpers'); // Adjust imports as needed

${methods.map(generateController).join('\n\n')}
`.trim();

  // Output directory `/controllers` relative to script location
  const outputDir = path.resolve(__dirname, 'controllers');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Output file name, e.g. MMLTilastotService.js -> MMLTilastotServiceController.js
  const outputFileName = path.basename(serviceFilePath, '.js') + 'Controller.js';
  const outputPath = path.join(outputDir, outputFileName);

  fs.writeFileSync(outputPath, controllerFileContent, 'utf-8');

  console.log(`Controllers generated and saved to ${outputPath}`);
}

main();