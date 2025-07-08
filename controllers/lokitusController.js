const lokitusService = require('../services/lokitusService');

exports.getAll = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      orderBy = 'id_loki',
      orderDir = 'ASC',
      searchTerm = '',
      userId = '',
      startDate,
      endDate
    } = req.query;

    const result = await lokitusService.getAll({
      page: parseInt(page),
      limit: parseInt(limit),
      orderBy,
      orderDir,
      searchTerm,
      userId,
      startDate,
      endDate
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching lokitus:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await lokitusService.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Lokitus not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const created = await lokitusService.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await lokitusService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Lokitus not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await lokitusService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Lokitus not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
