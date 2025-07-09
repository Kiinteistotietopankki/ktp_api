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