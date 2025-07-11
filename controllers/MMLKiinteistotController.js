const MMLKiinteistotService = require('../services/MML/MMLKiinteistotService');
const kiinteistotService = new MMLKiinteistotService();

// Apufunktio kohdetunnuksen tarkistukseen (esim. vaaditaan query-parametri)
function tarkistaKohdetunnus(req, res) {
  const kohdetunnus = req.params.kohdetunnus; // korjattu path-parametriksi
  if (!kohdetunnus) {
    res.status(400).json({ error: 'Kohdetunnus puuttuu' });
    return null;
  }
  return kohdetunnus;
}

// ========== PERUSTIEDOT ==========

exports.haePerustiedot = async (req, res) => {
  try {
    const kohdetunnus = tarkistaKohdetunnus(req, res);
    if (!kohdetunnus) return;

    const xmlData = await kiinteistotService.haePerustiedot(kohdetunnus);
    res.type('application/xml').send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.haeRekisteriyksikkoa = async (req, res) => {
  try {
    const kohdetunnus = tarkistaKohdetunnus(req, res);
    if (!kohdetunnus) return;

    const xmlData = await kiinteistotService.haeRekisteriyksikkoa(kohdetunnus);
    res.type('application/xml').send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.haeMaara_alaa = async (req, res) => {
  try {
    const kohdetunnus = tarkistaKohdetunnus(req, res);
    if (!kohdetunnus) return;

    const xmlData = await kiinteistotService.haeMaara_alaa(kohdetunnus);
    res.type('application/xml').send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.haeLaitosta = async (req, res) => {
  try {
    const kohdetunnus = tarkistaKohdetunnus(req, res);
    if (!kohdetunnus) return;

    const xmlData = await kiinteistotService.haeLaitosta(kohdetunnus);
    res.type('application/xml').send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.haeYhteystiedot = async (req, res) => {
  try {
    const kohdetunnus = tarkistaKohdetunnus(req, res);
    if (!kohdetunnus) return;

    const xmlData = await kiinteistotService.haeYhteystiedot(kohdetunnus);
    res.type('application/xml').send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========== LAINHUUTOTIEDOT ==========

exports.haeLainhuutotiedotIlmanhenkilotietoja = async (req, res) => {
  try {
    const kohdetunnus = tarkistaKohdetunnus(req, res);
    if (!kohdetunnus) return;

    const xmlData = await kiinteistotService.haeLainhuutotiedotIlmanhenkilotietoja(kohdetunnus);
    res.type('application/xml').send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.haeLainhuutotiedotIlmanhenkilotunnuksia = async (req, res) => {
  try {
    const kohdetunnus = tarkistaKohdetunnus(req, res);
    if (!kohdetunnus) return;

    const xmlData = await kiinteistotService.haeLainhuutotiedotIlmanhenkilotunnuksia(kohdetunnus);
    res.type('application/xml').send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.haeLainhuutotiedotHenkilotunnuksilla = async (req, res) => {
  try {
    const kohdetunnus = tarkistaKohdetunnus(req, res);
    if (!kohdetunnus) return;

    const xmlData = await kiinteistotService.haeLainhuutotiedotHenkilotunnuksilla(kohdetunnus);
    res.type('application/xml').send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========== RASITUSTIEDOT ==========

exports.haeRasitustiedotIlmanhenkilotietoja = async (req, res) => {
  try {
    const kohdetunnus = tarkistaKohdetunnus(req, res);
    if (!kohdetunnus) return;

    const xmlData = await kiinteistotService.haeRasitustiedotIlmanhenkilotietoja(kohdetunnus);
    res.type('application/xml').send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.haeRasitustiedotIlmanhenkilotunnuksia = async (req, res) => {
  try {
    const kohdetunnus = tarkistaKohdetunnus(req, res);
    if (!kohdetunnus) return;

    const xmlData = await kiinteistotService.haeRasitustiedotIlmanhenkilotunnuksia(kohdetunnus);
    res.type('application/xml').send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.haeRasitustiedotHenkilotunnuksilla = async (req, res) => {
  try {
    const kohdetunnus = tarkistaKohdetunnus(req, res);
    if (!kohdetunnus) return;

    const xmlData = await kiinteistotService.haeRasitustiedotHenkilotunnuksilla(kohdetunnus);
    res.type('application/xml').send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========== VUOKRAOIKEUSTIEDOT ==========

exports.haeVuokraoikeustiedotIlmanhenkilotunnuksia = async (req, res) => {
  try {
    const kohdetunnus = tarkistaKohdetunnus(req, res);
    if (!kohdetunnus) return;

    const xmlData = await kiinteistotService.haeVuokraoikeustiedotIlmanhenkilotunnuksia(kohdetunnus);
    res.type('application/xml').send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.haeVuokraoikeustiedotIlmanhenkilotietoja = async (req, res) => {
  try {
    const kohdetunnus = tarkistaKohdetunnus(req, res);
    if (!kohdetunnus) return;

    const xmlData = await kiinteistotService.haeVuokraoikeustiedotIlmanhenkilotietoja(kohdetunnus);
    res.type('application/xml').send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.haeVuokraoikeustiedotHenkilotunnuksilla = async (req, res) => {
  try {
    const kohdetunnus = tarkistaKohdetunnus(req, res);
    if (!kohdetunnus) return;

    const xmlData = await kiinteistotService.haeVuokraoikeustiedotHenkilotunnuksilla(kohdetunnus);
    res.type('application/xml').send(xmlData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
