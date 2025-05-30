const kiinteistotService = require('../services/kiinteistoService');


const getAllKiinteistot = async (req, res) => {
  try {
    const kiinteistot = await kiinteistotService.getAllKiinteistot();
    res.json(kiinteistot);
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
    const { kiinteistodata, rakennusdata, rakennustiedotArray } = req.body;
    const { newKiinteisto, newRakennukset, newRakennustiedot } = await kiinteistotService.createKiinteistoWhole(kiinteistodata, rakennusdata, rakennustiedotArray);
    res.status(201).json({ newKiinteisto, newRakennukset, newRakennustiedot});
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
  getKiinteistoById,
  createKiinteisto,
  createKiinteistoWhole,
  updateKiinteisto,
  deleteKiinteisto,
};
