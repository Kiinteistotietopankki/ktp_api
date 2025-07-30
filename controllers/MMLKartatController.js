// AUTO-GENERATED CONTROLLER for MMLKartatService from MMLKartatService.js

const MMLKartatService = require('../services/MML/MMLKartatService.js');
const mMLKartatService = new MMLKartatService();


exports.fetchTile = async (req, res) => {
  try {
    const { layerName, tileMatrixSet, zoom, y, x } = req.params;
    const z = parseInt(zoom, 10);
    const row = parseInt(y, 10);
    const col = parseInt(x, 10);

    if ([layerName, tileMatrixSet].some(v => !v) || [z, row, col].some(n => isNaN(n))) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }

    const result = await mMLKartatService.fetchTile(layerName, tileMatrixSet, z, row, col);

    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'public, max-age=604800');
    res.set('Expires', new Date(Date.now() + 604800000).toUTCString());

    res.send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
