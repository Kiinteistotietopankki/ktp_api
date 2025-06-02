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

const getKiinteistoWholeById = async (req, res) => {
  try {
    const kiinteisto = await kiinteistotService.getKiinteistoWholeById(req.params.id);
    if (!kiinteisto) return res.status(404).json({ error: 'Kiinteisto not found' });
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
    const { kiinteistodata, rakennusdata, rakennustiedotArray, rakennusluokituksetArray } = req.body;
    const { newKiinteisto, newRakennukset, newRakennustiedot, newRakennusluokitukset } =
      await kiinteistotService.createKiinteistoWhole(kiinteistodata, rakennusdata, rakennustiedotArray, rakennusluokituksetArray);
    res.status(201).json({ newKiinteisto, newRakennukset, newRakennustiedot, newRakennusluokitukset});
  } catch (err) {
    res.status(400).json({ error: err.message });
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
  getKiinteistoWholeById,
  getKiinteistoById,
  createKiinteisto,
  createKiinteistoWhole,
  updateKiinteisto,
  deleteKiinteisto,
};
