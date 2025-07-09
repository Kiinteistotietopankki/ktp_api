const fs = require('fs');
const path = require('path');
const { Xsd2JsonSchema } = require('xsd2jsonschema');

const xs2js = new Xsd2JsonSchema();

const inputDir = path.join(__dirname, 'schemas_mml');
const outputDir = path.join(__dirname, 'schemas_json');

// Make sure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

function convertAll() {
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    if (file.endsWith('.xsd')) {
      const xsdPath = path.join(inputDir, file);
      const xsdContent = fs.readFileSync(xsdPath, 'utf8');

      try {
        // Convert XSD to JSON Schema (processAllSchemas expects object with file names)
        const convertedSchemas = xs2js.processAllSchemas({
          schemas: { [file]: xsdContent }
        });

        const jsonSchemaObj = convertedSchemas[file].getJsonSchema();

        // Compose output file name (same base name, .json extension)
        const outputFileName = file.replace(/\.xsd$/i, '.json');
        const outputPath = path.join(outputDir, outputFileName);

        // Save JSON Schema to file
        fs.writeFileSync(outputPath, JSON.stringify(jsonSchemaObj, null, 2), 'utf8');
        console.log(`Converted ${file} -> ${outputFileName}`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

convertAll();