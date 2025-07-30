const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');
const sequelize = require('../config/dbConfig');
const Codebook = require('../models/Codebook');  // <-- import your existing model here

async function main() {
  const xml = fs.readFileSync('koodistot.xml', 'utf8');
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });
  const json = parser.parse(xml);

  await sequelize.authenticate();

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
