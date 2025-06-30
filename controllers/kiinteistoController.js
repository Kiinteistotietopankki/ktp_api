const { models } = require('../models');
const { getLookupCode, getLookupName } = require('../scripts/lookupHelper');
const kiinteistotService = require('../services/kiinteistoService');

const getAllKiinteistot = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const kiinteistot = await kiinteistotService.getAllKiinteistot(page, pageSize);


    res.json(kiinteistot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllKiinteistotWithData = async (req, res) => {
  try{
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const order = req.query.order || 'ASC'
    const searchTerm = req.query.searchTerm || ''

    const kiinteistot = await kiinteistotService.getAllKiinteistotWithData(page, pageSize, order, searchTerm)

    res.json(kiinteistot)
  } catch (err) {
    res.status(500).json({error : err.message})
  }
}

const getKiinteistoWholeById = async (req, res) => {
  try {
    const kiinteisto = await kiinteistotService.getKiinteistoWholeById(req.params.id);

    if (!kiinteisto) return res.status(404).json({ error: 'Kiinteistö not found' });

    for (const rakennus of kiinteisto.rakennukset) {
      for (const luokitus of rakennus.rakennusluokitukset) {
        luokitus.rakennusluokitus = await getLookupName(models.lookup_rakennusluokitus, luokitus.rakennusluokitus);
        luokitus.runkotapa = await getLookupName(models.lookup_rakentamistapa, luokitus.runkotapa);
        luokitus.kayttotilanne = await getLookupName(models.lookup_kayttotilanne, luokitus.kayttotilanne);
        luokitus.julkisivumateriaali = await getLookupName(models.lookup_julkisivumateriaali, luokitus.julkisivumateriaali);
        luokitus.lammitystapa = await getLookupName(models.lookup_lammitystapa, luokitus.lammitystapa);
        luokitus.lammitysenergialahde = await getLookupName(models.lookup_lammitysenergialahde, luokitus.lammitysenergialahde);
        luokitus.rakennusaine = await getLookupName(models.lookup_rakennusaine, luokitus.rakennusaine);
      }
    }

    res.json(kiinteisto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getKiinteistoById = async (req, res) => {
  try {
    const kiinteisto = await kiinteistotService.getKiinteistoById(req.params.id);
    if (!kiinteisto) return res.status(404).json({ error: 'Kiinteisto not found' });
    res.json(kiinteisto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createKiinteisto = async (req, res) => {
  try {
    const newKiinteisto = await kiinteistotService.createKiinteisto(req.body);
    res.status(201).json(newKiinteisto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createKiinteistoWhole = async (req, res) => {
  try {
    console.log('Received create request:', JSON.stringify(req.body, null, 2));

    let { kiinteistodata, rakennusdata, rakennustiedotArray, rakennusluokituksetArray } = req.body;

    // For each rakennusdata item, translate rakennusluokituksetArray fields
    for (const rakennus of rakennusdata) {
      if (rakennus.rakennusluokituksetArray) {
        for (const item of rakennus.rakennusluokituksetArray) {
          item.rakennusluokitus = await getLookupCode(models.lookup_rakennusluokitus, item.rakennusluokitus);
          item.runkotapa = await getLookupCode(models.lookup_rakentamistapa, item.runkotapa);
          // Do the same for other fields using appropriate lookup models
          item.julkisivumateriaali = await getLookupCode(models.lookup_julkisivumateriaali, item.julkisivumateriaali);
          item.lammitystapa = await getLookupCode(models.lookup_lammitystapa, item.lammitystapa);
          item.lammitysenergialahde = await getLookupCode(models.lookup_lammitysenergialahde, item.lammitysenergialahde);
          item.rakennusaine = await getLookupCode(models.lookup_rakennusaine, item.rakennusaine);
          item.kayttotilanne = await getLookupCode(models.lookup_kayttotilanne, item.kayttotilanne)
        }
      }
    }

    const result = await kiinteistotService.createKiinteistoWhole(
      kiinteistodata,
      rakennusdata,
      rakennustiedotArray,
      rakennusluokituksetArray
    ); 
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating kiinteisto:', err);
    if (err.details) {
      res.status(400).json({ error: 'Validation error', details: err.details.map(d => d.message) });
    } else {
      res.status(400).json({ error: err.message || 'Unknown error' });
    }
  }
};


const updateKiinteisto = async (req, res) => {
  try {
    const updatedKiinteisto = await kiinteistotService.updateKiinteisto(req.params.id, req.body);
    res.json(updatedKiinteisto);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const deleteKiinteisto = async (req, res) => {
  try {
    await kiinteistotService.deleteKiinteisto(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  getAllKiinteistot,
  getAllKiinteistotWithData,
  getKiinteistoWholeById,
  getKiinteistoById,
  createKiinteisto,
  createKiinteistoWhole,
  updateKiinteisto,
  deleteKiinteisto,
};
