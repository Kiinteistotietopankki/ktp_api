const ptsService = require('../services/ptsService');

exports.create = async (req, res) => {
  try {
    const created = await ptsService.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await ptsService.getById(req.params.id);
    if (!data) return res.status(404).json({ message: 'PTS project not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getByKiinteistotunnus = async (req, res) => {
  try {
    const result = await ptsService.getByKiinteistotunnus(req.params.kiinteistotunnus);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await ptsService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'PTS project not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await ptsService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'PTS project not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
