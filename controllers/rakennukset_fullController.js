const rakennukset_fullService = require('../services/rakennukset_fullService');

exports.getAll = async (req, res) => {
  try {
    const items = await rakennukset_fullService.getAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await rakennukset_fullService.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Rakennukset_full not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const created = await rakennukset_fullService.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await rakennukset_fullService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Rakennukset_full not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await rakennukset_fullService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Rakennukset_full not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
