// AUTO-GENERATED CONTROLLER for MMLKartatService from MMLKartatService.js

const MMLKartatService = require('../services/MML/MMLKartatService.js');
const mMLKartatService = new MMLKartatService();


exports.fetchTileByLatLng = async (req, res) => {
  try {
    const layerName = req.query.layerName || 'taustakartta';
    const tileMatrixSet = req.query.tileMatrixSet || 'WGS84_Pseudo-Mercator';

    const zoom = parseInt(req.query.zoom ?? '17', 10);
    const lat = parseFloat(req.query.lat ?? '65.00816937');
    const lng = parseFloat(req.query.lng ?? '25.46030678');

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

    // ⬇️ Palauta myös caching-headerit
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'public, max-age=604800'); // 1 viikko selaimelle
    const expires = new Date(Date.now() + 604800000).toUTCString(); // 1 viikko eteenpäin
    res.set('Expires', expires);

    res.send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};