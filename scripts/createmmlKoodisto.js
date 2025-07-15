const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');
const sequelize = require('../config/dbConfig');
const { DataTypes } = require('sequelize');

// Define model (adjust fields as needed)
const Codebook = sequelize.define('codebook', {
  category: DataTypes.STRING,
  code: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: true,
  },
  name_fi: DataTypes.TEXT,
  name_sv: DataTypes.TEXT,
}, {
  timestamps: false,
  tableName: 'codebook',
});

async function main() {
  // Load and parse XML
  const xml = fs.readFileSync('koodistot.xml', 'utf8');
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });
  const json = parser.parse(xml);

  await sequelize.authenticate();
  await sequelize.sync(); // optional: create table if not exists

  const codes = json['kood:Koodistot']['y:asianLaadunPeruste'];
  
  for (const item of codes) {
    const code = item.tunnus;
    let name_fi = null;
    let name_sv = null;

    const names = Array.isArray(item['y:nimi']) ? item['y:nimi'] : [item['y:nimi']];
    for (const name of names) {
      if (name.kieli === 'fi') name_fi = name['#text'];
      if (name.kieli === 'sv') name_sv = name['#text'];
    }

    await Codebook.upsert({
      category: 'asianLaadunPeruste',
      code,
      name_fi,
      name_sv
    });
  }

  console.log('Done!');
  await sequelize.close();
}

main().catch(console.error);
