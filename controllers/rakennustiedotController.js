const rakennuksetService = require('../services/rakennustiedotService.js');

const getRakennustiedotById_Rakennus = async (req, res) => {
  try {
    const id = req.params.id;
    const tiedot = await rakennuksetService.findRakennustiedotById_Rakennus(id);

    if (!tiedot) {
      return res.status(404).json({ error: 'Rakennustiedot not found' });
    }

    res.json(tiedot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRakennustiedot = async (req, res) => {
  try {
    const id = req.params.id;        // From the URL: /rakennukset/:id
    const updates = req.body;        // All fields to update come in the JSON body

    const tiedot = await rakennuksetService.updateRakennustiedot(id, updates);
    res.json(tiedot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getRakennustiedotById_Rakennus,
    updateRakennustiedot
};
