const fs = require('fs');
const xml2js = require('xml2js');

const xmlData = fs.readFileSync('./koodistot/mmlKoodisto.xml', 'utf-8');

const parser = new xml2js.Parser({
  explicitArray: true,
  tagNameProcessors: [xml2js.processors.stripPrefix],
  attrNameProcessors: [xml2js.processors.stripPrefix]
});

parser.parseString(xmlData, (err, result) => {
  if (err) {
    console.error("XML parse error:", err);
    return;
  }
  
  const koodisto = {};
  const asiat = result.Koodistot.asianLaadunPeruste || [];

  asiat.forEach(item => {
    const tunnus = item.$.tunnus;
    const nimet = {};
    item.nimi.forEach(nimi => {
      const kieli = nimi.$.kieli;
      const teksti = nimi._;
      nimet[kieli] = teksti;
    });
    koodisto[tunnus] = nimet;
  });

  // Save JSON to file
  fs.writeFileSync('./koodistot/koodisto.json', JSON.stringify(koodisto, null, 2), 'utf-8');
  console.log('JSON saved to koodisto.json');
});