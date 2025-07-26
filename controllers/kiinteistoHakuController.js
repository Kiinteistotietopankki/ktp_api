// AUTO-GENERATED CONTROLLER for KiinteistoHakuService from kiinteistoHakuService.js

const KiinteistoHakuService = require('../services/SEARCH/kiinteistoHakuService.js');
const kiinteistoHakuService = new KiinteistoHakuService();

exports.haeKiinteistoja = async (req, res) => {
  const { kiinteistotunnus, osoite, kaupunki } = req.query;
  const service = new KiinteistoHakuService();

  const result = await service.haeKiinteistoja(kiinteistotunnus, osoite, kaupunki);

  return res.status(result.status).json(
    result.error ? { error: result.error } : result.data
  );
};

exports.fetchOsoiteData = async (req, res) => {
  try {
    const osoite = req.query.osoite || '';
    const kaupunki = req.query.kaupunki || '';

    const result = await kiinteistoHakuService.fetchOsoiteData(osoite, kaupunki);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.extractBuildingKeys = async (req, res) => {
  try {
    const osoiteData = req.query.osoiteData || '';

    const result = await kiinteistoHakuService.extractBuildingKeys(osoiteData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.extractAddressKeys = async (req, res) => {
  try {
    const osoiteData = req.query.osoiteData || '';

    const result = await kiinteistoHakuService.extractAddressKeys(osoiteData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.haeKiinteistotunnukset = async (req, res) => {
  try {
    const buildingKeys = req.query.buildingKeys || '';

    const result = await kiinteistoHakuService.haeKiinteistotunnukset(buildingKeys);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchBuildingKeyData = async (req, res) => {
  try {
    const key = req.query.key || '';

    const result = await kiinteistoHakuService.fetchBuildingKeyData(key);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.extractTunnus = async (req, res) => {
  try {
    const data = req.query.data || '';

    const result = await kiinteistoHakuService.extractTunnus(data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createKiinteistot = async (req, res) => {
  try {
    const kiinteistotunnukset = req.query.kiinteistotunnukset || '';
    const addresskeys = req.query.addresskeys || '';
    const osoite = req.query.osoite || '';

    const result = await kiinteistoHakuService.createKiinteistot(kiinteistotunnukset, addresskeys, osoite);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createKiinteistotWithoutAddress = async (req, res) => {
  try {
    const kiinteistotunnukset = req.query.kiinteistotunnukset || '';

    const result = await kiinteistoHakuService.createKiinteistotWithoutAddress(kiinteistotunnukset);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};