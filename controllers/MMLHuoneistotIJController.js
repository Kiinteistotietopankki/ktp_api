// AUTO-GENERATED CONTROLLER for MMLHuoneistotIJService from MMLHuoneistotIJService.js

const MMLHuoneistotIJService = require('../services/MML/MMLHuoneistotIJService.js');
const mMLHuoneistotIJService = new MMLHuoneistotIJService();
const { handleServiceError } = require('../utils/utils.js')

exports.haeKunnossapitoselvitykset = async (req, res) => {
  try {
    const ytunnus = req.query.ytunnus || '';

    const result = await mMLHuoneistotIJService.haeKunnossapitoselvitykset(ytunnus);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.haeKunnossapitoselvitys = async (req, res) => {
  try {
    const ytunnus = req.query.ytunnus || '';
    const vuosi = req.query.vuosi || '';

    const result = await mMLHuoneistotIJService.haeKunnossapitoselvitys(ytunnus, vuosi);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.tallennaKunnossapitoselvitys = async (req, res) => {
  try {
    const ytunnus = req.query.ytunnus || '';
    const vuosi = req.query.vuosi || '';
    const data = req.query.data || '';

    const result = await mMLHuoneistotIJService.tallennaKunnossapitoselvitys(ytunnus, vuosi, data);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.paivitaKunnossapitoselvitys = async (req, res) => {
  try {
    const ytunnus = req.query.ytunnus || '';
    const vuosi = req.query.vuosi || '';
    const data = req.query.data || '';

    const result = await mMLHuoneistotIJService.paivitaKunnossapitoselvitys(ytunnus, vuosi, data);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.haeHanke = async (req, res) => {
  try {
    const ytunnus = req.query.ytunnus || '';
    const hanketunniste = req.query.hanketunniste || '';

    const result = await mMLHuoneistotIJService.haeHanke(ytunnus, hanketunniste);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.paivitaHanke = async (req, res) => {
  try {
    const ytunnus = req.query.ytunnus || '';
    const hanketunniste = req.query.hanketunniste || '';
    const data = req.query.data || '';

    const result = await mMLHuoneistotIJService.paivitaHanke(ytunnus, hanketunniste, data);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.haeHankkeet = async (req, res) => {
  try {
    const ytunnus = req.query.ytunnus || '';

    const result = await mMLHuoneistotIJService.haeHankkeet(ytunnus);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.tallennaHankkeet = async (req, res) => {
  try {
    const ytunnus = req.query.ytunnus || '';
    const data = req.query.data || '';

    const result = await mMLHuoneistotIJService.tallennaHankkeet(ytunnus, data);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.haeOsakasremontit = async (req, res) => {
  try {
    const ytunnus = req.query.ytunnus || '';

    const result = await mMLHuoneistotIJService.haeOsakasremontit(ytunnus);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.haeKoodistoKPTS = async (req, res) => {
  try {
    const ytunnus = req.query.ytunnus || '';
    const vuosi = req.query.vuosi || '';
    const koodistotunnus = req.query.koodistotunnus || '';

    const result = await mMLHuoneistotIJService.haeKoodistoKPTS(ytunnus, vuosi, koodistotunnus);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.haeKoodistoHanke = async (req, res) => {
  try {
    const ytunnus = req.query.ytunnus || '';
    const hanketunniste = req.query.hanketunniste || '';
    const koodistotunnus = req.query.koodistotunnus || '';

    const result = await mMLHuoneistotIJService.haeKoodistoHanke(ytunnus, hanketunniste, koodistotunnus);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.poistaKunnossapitoselvitysVersio = async (req, res) => {
  try {
    const ytunnus = req.query.ytunnus || '';
    const vuosi = req.query.vuosi || '';
    const versioId = parseInt(req.query.versioId) || 0;

    const result = await mMLHuoneistotIJService.poistaKunnossapitoselvitysVersio(ytunnus, vuosi, versioId);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.poistaHankeVersio = async (req, res) => {
  try {
    const ytunnus = req.query.ytunnus || '';
    const hanketunniste = req.query.hanketunniste || '';
    const versioId = parseInt(req.query.versioId) || 0;

    const result = await mMLHuoneistotIJService.poistaHankeVersio(ytunnus, hanketunniste, versioId);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.haeHallintakohteetJaOsakeryhmat = async (req, res) => {
  try {
    const ytunnus = req.query.ytunnus || '';

    console.log(ytunnus)

    const result = await mMLHuoneistotIJService.haeHallintakohteetJaOsakeryhmat(ytunnus);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error);
  }
};
