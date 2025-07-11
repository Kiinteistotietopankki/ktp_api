// AUTO-GENERATED CONTROLLER for MMLTilastotService from MMLTilastotService.js

const MMLTilastotService = require('../services/MML/MMLTilastotService.js');
const mMLTilastotService = new MMLTilastotService();

exports.getKuntaRegions = async (req, res) => {
  try {
    // no params

    const result = await mMLTilastotService.getKuntaRegions();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getKuntaCodeByName = async (req, res) => {
  try {
    const kuntaName = req.query.kuntaName || '';

    const result = await mMLTilastotService.getKuntaCodeByName(kuntaName);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIndicatorDataForKunta = async (req, res) => {
  try {
    const indicatorId = parseInt(req.query.indicatorId) || 0;
    const years = parseInt(req.query.years) || 0;

    const result = await mMLTilastotService.getIndicatorDataForKunta(indicatorId, years);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIndicatorValueByKuntaName = async (req, res) => {
  try {
    const indicatorId = parseInt(req.query.indicatorId) || 0;
    const kuntaName = req.query.kuntaName || '';
    const years = parseInt(req.query.years) || 0;

    const result = await mMLTilastotService.getIndicatorValueByKuntaName(indicatorId, kuntaName, years);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};