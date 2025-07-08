const Rakennukset_fullService = require('../services/rakennukset_fullService');

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
    const item = await Rakennukset_fullService.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Rakennukset_full not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById_kiinteisto = async (req, res) => {
  try {
    const item = await Rakennukset_fullService.getById_kiinteisto(req.params.id);
    if (!item) return res.status(404).json({ message: 'Rakennukset_full not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById_kiinteistoWithMetadata = async (req, res) => {
  try {
    const { id_kiinteisto } = req.params;

    if (!id_kiinteisto) {
      return res.status(400).json({ error: 'id_kiinteisto parameter is required' });
    }

    const result = await Rakennukset_fullService.getById_kiinteistoWithMetadata(parseInt(id_kiinteisto));

    res.json(result);
  } catch (error) {
    console.error('Error fetching rakennukset with metadata:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const created = await Rakennukset_fullService.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Rakennukset_fullService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Rakennukset_full not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Rakennukset_fullService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Rakennukset_full not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
