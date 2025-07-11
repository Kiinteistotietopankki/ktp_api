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

    const years = Array.isArray(req.query.years)
      ? req.query.years.map(Number)
      : req.query.years
        ? [Number(req.query.years)]
        : [];

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

    let years = [];
    if (req.query.years) {
      if (Array.isArray(req.query.years)) {
        years = req.query.years.flatMap(y => y.split(',').map(Number));
      } else {
        years = req.query.years.split(',').map(Number);
      }
    }

    let result = await mMLTilastotService.getIndicatorValueByKuntaName(indicatorId, kuntaName, years);

    // Sort result by year ascending (assuming each entry has a 'year' property)
    result = result.sort((a, b) => a.year - b.year);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};