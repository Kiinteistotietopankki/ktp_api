const { models } = require('../models');  // You don't seem to use this here, can remove
const lokitusService = require('../services/lokitusService');

const createLoki = async (req, res) => {
  try {
    const newLoki = await lokitusService.createLoki(req.body);  // <-- Make sure service method name matches!
    res.status(201).json(newLoki);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createLoki
};