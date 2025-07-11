const MMLKiinteistotService = require('../services/MML/MMLKiinteistotService');
const kiinteistotService = new MMLKiinteistotService();
const xml2js = require('xml2js');

// Apufunktio kohdetunnuksen tarkistukseen (esim. vaaditaan query-parametri)
function tarkistaKohdetunnus(req, res) {
  const kohdetunnus = req.params.kohdetunnus; // korjattu path-parametriksi
  if (!kohdetunnus) {
    res.status(400).json({ error: 'Kohdetunnus puuttuu' });
    return null;
  }
  return kohdetunnus;
}

function findErrorKey(obj) {
  if (typeof obj !== 'object' || obj === null) return null;
  if ('y:virhe' in obj) return obj['y:virhe'];
  for (const key in obj) {
    const result = findErrorKey(obj[key]);
    if (result) return result;
  }
  return null;
}

async function parseXmlToJsonAndCheckErrors(xmlData) {
  try {
    const parser = new xml2js.Parser({ explicitArray: false });
    const json = await parser.parseStringPromise(xmlData);

    const error = findErrorKey(json);

    return { json, error };
  } catch (err) {
    return { json: null, error: 'XML parsing failed' };
  }
}

async function handleRequest(res, serviceCall) {
  try {
    const xmlData = await serviceCall();  // This works for 2xx status

    const { json, error } = await parseXmlToJsonAndCheckErrors(xmlData);
    if (error) {
      return res.status(400).json({ error });
    }
    res.json(json);
  } catch (err) {
    if (err.response && err.response.data) {
      // err.response.data might contain your XML error message
      const xmlData = err.response.data;

      const { json, error } = await parseXmlToJsonAndCheckErrors(xmlData);
      if (error) {
        return res.status(400).json({ error });
      } else {
        return res.status(err.response.status || 500).json(json || { error: 'Unknown error' });
      }
    } else {
      res.status(500).json({ error: err.message });
    }
  }
}

// ========== ENDPOINTIT ==========

exports.haePerustiedot = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handleRequest(res, () => kiinteistotService.haePerustiedot(kohdetunnus));
};

exports.haeRekisteriyksikkoa = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handleRequest(res, () => kiinteistotService.haeRekisteriyksikkoa(kohdetunnus));
};

exports.haeMaara_alaa = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handleRequest(res, () => kiinteistotService.haeMaara_alaa(kohdetunnus));
};

exports.haeLaitosta = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handleRequest(res, () => kiinteistotService.haeLaitosta(kohdetunnus));
};

exports.haeYhteystiedot = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handleRequest(res, () => kiinteistotService.haeYhteystiedot(kohdetunnus));
};

// ========== LAINHUUTOTIEDOT ==========

exports.haeLainhuutotiedotIlmanhenkilotietoja = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handleRequest(res, () => kiinteistotService.haeLainhuutotiedotIlmanhenkilotietoja(kohdetunnus));
};

exports.haeLainhuutotiedotIlmanhenkilotunnuksia = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handleRequest(res, () => kiinteistotService.haeLainhuutotiedotIlmanhenkilotunnuksia(kohdetunnus));
};

exports.haeLainhuutotiedotHenkilotunnuksilla = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handleRequest(res, () => kiinteistotService.haeLainhuutotiedotHenkilotunnuksilla(kohdetunnus));
};

// ========== RASITUSTIEDOT ==========

exports.haeRasitustiedotIlmanhenkilotietoja = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handleRequest(res, () => kiinteistotService.haeRasitustiedotIlmanhenkilotietoja(kohdetunnus));
};

exports.haeRasitustiedotIlmanhenkilotunnuksia = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handleRequest(res, () => kiinteistotService.haeRasitustiedotIlmanhenkilotunnuksia(kohdetunnus));
};

exports.haeRasitustiedotHenkilotunnuksilla = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handleRequest(res, () => kiinteistotService.haeRasitustiedotHenkilotunnuksilla(kohdetunnus));
};

// ========== VUOKRAOIKEUSTIEDOT ==========

exports.haeVuokraoikeustiedotIlmanhenkilotunnuksia = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handleRequest(res, () => kiinteistotService.haeVuokraoikeustiedotIlmanhenkilotunnuksia(kohdetunnus));
};

exports.haeVuokraoikeustiedotIlmanhenkilotietoja = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handleRequest(res, () => kiinteistotService.haeVuokraoikeustiedotIlmanhenkilotietoja(kohdetunnus));
};

exports.haeVuokraoikeustiedotHenkilotunnuksilla = async (req, res) => {
  const kohdetunnus = tarkistaKohdetunnus(req, res);
  if (!kohdetunnus) return;
  await handleRequest(res, () => kiinteistotService.haeVuokraoikeustiedotHenkilotunnuksilla(kohdetunnus));
};