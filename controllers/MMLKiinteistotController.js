const MMLKiinteistotService = require('../services/MML/MMLKiinteistotService');
const kiinteistotService = new MMLKiinteistotService();

exports.haePerustiedot = async (req, res) => {
  try {
    const kohdetunnus = req.params.kohdetunnus;
    if (!kohdetunnus) {
      return res.status(400).json({ error: 'kohdetunnus parameter is required' });
    }

    const xmlData = await kiinteistotService.haePerustiedot(kohdetunnus);
    res.type('application/xml').send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LAINHUUTOTIEDOT

exports.haeLainhuutotiedotIlmanhenkilotietoja = async (req, res) => {
    try {
      const kohdetunnus = req.params.kohdetunnus;
      if (!kohdetunnus) {
        return res.status(400).json({ error: 'kohdetunnus parameter is required' });
      }

      const xmlData = await kiinteistotService.haeLainhuutotiedotIlmanhenkilotietoja(kohdetunnus);
      res.type('application/xml').send(xmlData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.haeLainhuutotiedotIlmanhenkilotunnuksia = async (req, res) => {
    try {
      const kohdetunnus = req.params.kohdetunnus;
      if (!kohdetunnus) {
        return res.status(400).json({ error: 'kohdetunnus parameter is required' });
      }

      const xmlData = await kiinteistotService.haeLainhuutotiedotIlmanhenkilotunnuksia(kohdetunnus);
      res.type('application/xml').send(xmlData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // RASITUSTIEDOT

  exports.haeRasitustiedotIlmanhenkilotietoja = async (req, res) => {
    try {
      const kohdetunnus = req.params.kohdetunnus;
      if (!kohdetunnus) {
        return res.status(400).json({ error: 'kohdetunnus parameter is required' });
      }

      const xmlData = await kiinteistotService.haeRasitustiedotIlmanhenkilotietoja(kohdetunnus);
      res.type('application/xml').send(xmlData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };