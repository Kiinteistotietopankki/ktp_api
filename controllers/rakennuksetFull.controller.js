const rakennuksetFullService = require('../services/rakennuksetFull.service');

class RakennuksetFullController {
  async getAll(req, res) {
    try {
      const data = await rakennuksetFullService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const data = await rakennuksetFullService.getById(id);
      if (!data) return res.status(404).json({ message: 'Rakennus not found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async create(req, res) {
    try {
      const created = await rakennuksetFullService.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const updated = await rakennuksetFullService.update(id, req.body);
      res.json(updated);
    } catch (err) {
      if (err.message === 'Rakennus not found') return res.status(404).json({ message: err.message });
      res.status(400).json({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await rakennuksetFullService.delete(id);
      res.status(204).send();
    } catch (err) {
      if (err.message === 'Rakennus not found') return res.status(404).json({ message: err.message });
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new RakennuksetFullController();
