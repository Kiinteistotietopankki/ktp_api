const rakennuksetService = require('../services/rakennusService');

const getAllRakennukset = async (req, res) => {
  try {
    const rakennukset = await rakennuksetService.getAllRakennukset();
    res.json(rakennukset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRakennusById = async (req, res) => {
  try {
    const rakennus = await rakennuksetService.getRakennusById(req.params.id);
    if (!rakennus) return res.status(404).json({ error: 'Rakennus not found' });
    res.json(rakennus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createRakennus = async (req, res) => {
  try {
    const newRakennus = await rakennuksetService.createRakennus(req.body);
    res.status(201).json(newRakennus);
  } catch (err) {

    const status = err.statusCode || 400;  
    res.status(status).json({ error: err.message });
  }
};

const updateRakennus = async (req, res) => {
  try {
    const updatedRakennus = await rakennuksetService.updateRakennus(req.params.id, req.body);
    res.json(updatedRakennus);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const deleteRakennus = async (req, res) => {
  try {
    await rakennuksetService.deleteRakennus(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  getAllRakennukset,
  getRakennusById,
  createRakennus,
  updateRakennus,
  deleteRakennus,
};
