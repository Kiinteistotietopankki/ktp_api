const rakennuksetService = require('../services/rakennusService');
const sequelize = require('../config/dbConfig'); // import your Sequelize instance
const initModels = require('../models/init-models');

const { rakennukset } = initModels(sequelize);

const getAllRakennukset = async (req, res) => {
  try {
    const data = await rakennuksetService.getAllRakennukset();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRakennusById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await rakennuksetService.getRakennusById(id);
    if (!data) {
      return res.status(404).json({ message: 'Rakennus not found' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRakennus = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await rakennuksetService.updateRakennus(id, req.body);
    res.json(updated);
  } catch (error) {
    if (error.message === 'Rakennus not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const deleteRakennus = async (req, res) => {
  try {
    const id = req.params.id;
    await rakennuksetService.deleteRakennus(id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Rakennus not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const createRakennus = async (req, res) => {
  try {
    const { id_kiinteisto, rakennustunnus, osoite, toimipaikka, postinumero } = req.body;

    if (!id_kiinteisto || !rakennustunnus || !osoite) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const newRakennus = await rakennukset.create({
      id_kiinteisto,
      rakennustunnus,
      osoite,
      toimipaikka,
      postinumero
    });

    res.status(201).json(newRakennus);
  } catch (error) {
    console.error('Create error:', error);
    res.status(500).json({ message: 'Failed to create rakennus' });
  }
};

const createRakennusWithMetaDataYmparisto = async (req, res) => {
  try {
    const { id_kiinteisto, rakennustunnus, osoite, toimipaikka, postinumero } = req.body;

    if (!id_kiinteisto || !rakennustunnus || !osoite) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // You can replace this with real user info if available from auth middleware
    const user = req.user?.username || 'unknown';

    const { rakennus, metadata } = await rakennuksetService.createRakennusWithMetadataYmparisto({
      id_kiinteisto,
      rakennustunnus,
      osoite,
      toimipaikka,
      postinumero
    }, user);

    res.status(201).json({ rakennus, metadata });
  } catch (error) {
    console.error('Create error:', error);
    res.status(500).json({ message: 'Failed to create rakennus' });
  }
};

const findRakennusByKiinteistoId = async (req, res) => {
  try {
    const id = req.params.kiinteistoId;
    const data = await rakennuksetService.findRakennusByKiinteistoId(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getAllRakennukset,
  getRakennusById,
  updateRakennus,
  deleteRakennus,
  findRakennusByKiinteistoId,
  createRakennus,
  createRakennusWithMetaDataYmparisto
};