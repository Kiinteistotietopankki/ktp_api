// AUTO-GENERATED CONTROLLER for KiinteistoHakuService from kiinteistoHakuService.js

const KiinteistoHakuService = require('../services/SEARCH/kiinteistoHakuService.js');
const kiinteistoHakuService = new KiinteistoHakuService();

exports.haeKiinteistoja = async (req, res) => {
  let { kiinteistotunnus, osoite, kaupunki } = req.query;
  kiinteistotunnus = kiinteistotunnus?.trim() || '';
  osoite = osoite?.trim() || '';
  kaupunki = kaupunki?.trim() || '';
  const service = new KiinteistoHakuService();

  const result = await service.haeKiinteistoja(kiinteistotunnus, osoite, kaupunki);

  return res.status(result.status).json(
    result.error ? { error: result.error } : result.data
  );
};
