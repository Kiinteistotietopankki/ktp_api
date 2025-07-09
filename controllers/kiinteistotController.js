const kiinteistotService = require('../services/kiinteistotService');


exports.getAll = async (req, res) => {
  try {
    const items = await kiinteistotService.getAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllWithRakennukset = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const orderBy = req.query.orderBy || 'id_kiinteisto';
    const orderDir = req.query.orderDir || 'ASC';
    const searchTerm = req.query.searchTerm || ''; // <-- added

    const result = await kiinteistotService.getAllWithRakennukset(
      page,
      limit,
      orderBy,
      orderDir,
      searchTerm // <-- added
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createWithRakennukset = async (req, res) => {
  try {
    const kiinteistoData = req.body;

    const createdKiinteisto = await kiinteistotService.createWithRakennukset(kiinteistoData);

    res.status(201).json(createdKiinteisto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};


exports.getById = async (req, res) => {
  try {
    const item = await kiinteistotService.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Kiinteistot not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByIdWithRakennukset = async (req, res) => {
  try {
    const item = await kiinteistotService.getByIdWithRakennukset(req.params.id);
    if (!item) return res.status(404).json({ message: 'Kiinteistot not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const created = await kiinteistotService.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await kiinteistotService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Kiinteistot not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await kiinteistotService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Kiinteistot not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
