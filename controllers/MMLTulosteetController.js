const MMLTulosteetService = require('../services/MML/MMLTulosteetService.js');
const tulosteetService = new MMLTulosteetService();

// Apufunktio kohdetunnuksen tarkistukseen (path-parametrina)
function tarkistaKohdetunnus(req, res) {
  const kohdetunnus = req.params.kohdetunnus;
  if (!kohdetunnus) {
    res.status(400).json({ error: 'Kohdetunnus puuttuu' });
    return null;
  }
  return kohdetunnus;
}

// Yleinen käsittelijä PDF-palvelukutsuille
async function handlePdfRequest(res, serviceCall) {
  try {
    const pdfData = await serviceCall();
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfData);
  } catch (err) {
    console.error('Virhe PDF-haussa:', err.message);
    res.status(500).json({ error: err.message || 'Virhe palvelussa' });
  }
}

// ========== ENDPOINTIT ==========

exports.haeLainhuutotodistus = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handlePdfRequest(res, () => tulosteetService.haeLainhuutotodistus(kohdetunnus));
};

exports.haeLainhuutotodistusIlmanHenkilotietoja = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handlePdfRequest(res, () => tulosteetService.haeLainhuutotodistusIlmanHenkilotietoja(kohdetunnus));
};

exports.haeRasitustodistus = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handlePdfRequest(res, () => tulosteetService.haeRasitustodistus(kohdetunnus));
};

exports.haeRasitustodistusIlmanHenkilotietoja = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handlePdfRequest(res, () => tulosteetService.haeRasitustodistusIlmanHenkilotietoja(kohdetunnus));
};

exports.haeVuokraoikeustodistus = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handlePdfRequest(res, () => tulosteetService.haeVuokraoikeustodistus(kohdetunnus));
};

exports.haeVuokraoikeustodistusIlmanHenkilotietoja = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handlePdfRequest(res, () => tulosteetService.haeVuokraoikeustodistusIlmanHenkilotietoja(kohdetunnus));
};

exports.haeYhteystiedot = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handlePdfRequest(res, () => tulosteetService.haeYhteystiedot(kohdetunnus));
};
