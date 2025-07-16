// AUTO-GENERATED CONTROLLER for MMLKartatService from MMLKartatService.js

const MMLKartatService = require('../services/MML/MMLKartatService.js');
const mMLKartatService = new MMLKartatService();


exports.fetchTileByLatLng = async (req, res) => {
  try {
    const layerName = req.query.layerName || 'taustakartta';
    const tileMatrixSet = req.query.tileMatrixSet || 'WGS84_Pseudo-Mercator';

    // 👇 Ensure proper number conversion
    const zoom = parseInt(req.query.zoom ?? '17', 10);
    const lat = parseFloat(req.query.lat ?? '65.00816937');
    const lng = parseFloat(req.query.lng ?? '25.46030678');

    // 🔍 Validate values
    if (!isFinite(lat) || !isFinite(lng) || !Number.isInteger(zoom)) {
      return res.status(400).json({ error: 'Invalid lat, lng, or zoom' });
    }

    const result = await mMLKartatService.fetchTileByLatLng(
      layerName,
      tileMatrixSet,
      zoom,
      lat,
      lng
    );

    res.set('Content-Type', 'image/png'); // assuming you're sending an image
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};