// AUTO-GENERATED CONTROLLER for MMLKartatService from MMLKartatService.js

const MMLKartatService = require('../services/MML/MMLKartatService.js');
const mMLKartatService = new MMLKartatService();


exports.fetchTileByCoords = async (req, res) => {
  try {
    const layerName = req.params.layerName || 'taustakartta';
    const tileMatrixSet = req.params.tileMatrixSet || 'WGS84_Pseudo-Mercator';

    const z = parseInt(req.params.z, 10);
    const y = parseInt(req.params.y, 10);
    const x = parseInt(req.params.x, 10);

    if (!Number.isInteger(z) || !Number.isInteger(x) || !Number.isInteger(y)) {
      return res.status(400).json({ error: 'Invalid tile coordinates: z, x, or y' });
    }

    const tileBuffer = await mMLKartatService.fetchTile(layerName, tileMatrixSet, z, y, x);

    res.set('Content-Type', 'image/png');
    res.send(tileBuffer);
  } catch (error) {
    console.error('Tile fetch error:', error.message);
    res.status(500).json({ error: error.message });
  }
};