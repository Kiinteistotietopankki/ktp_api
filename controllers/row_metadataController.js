const row_metadataService = require('../services/row_metadataService');

exports.getAll = async (req, res) => {
  try {
    const items = await row_metadataService.getAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await row_metadataService.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Row_metadata not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const created = await row_metadataService.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await row_metadataService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Row_metadata not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await row_metadataService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Row_metadata not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
