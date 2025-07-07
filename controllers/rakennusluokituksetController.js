const rakennusluokituksetService = require('../services/rakennusluokituksetService.js');

const getLuokituksettById_Rakennus = async (req, res) => {
  try {
    const id = req.params.id;
    const tiedot = await rakennusluokituksetService.findRakennuluokituksetById_Rakennus(id);

    if (!tiedot) {
      return res.status(404).json({ error: 'Rakennustiedot not found' });
    }

    res.json(tiedot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRakennusluokitukset = async (req, res) => {
  try {
    const id = req.params.id;       // From the URL: /rakennukset/:id
    const updates = req.body;       // All fields to update come in the JSON body

    const tiedot = await rakennusluokituksetService.updateRakennusluokitukset(id, updates);
    res.json(tiedot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
    getLuokituksettById_Rakennus,
    updateRakennusluokitukset
};
