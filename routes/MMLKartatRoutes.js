const express = require('express');
const router = express.Router();
const controller = require('../controllers/MMLKartatController.js');



/**
 * @swagger
 * /api/kartat/fetch-tile-by-lat-lng:
 *   get:
 *     summary: fetchTileByLatLng (auto-generated route)
 *     tags:
 *       - kartat
 *     parameters:
 *       - in: query
 *         name: layerName
 *         required: false
 *         schema:
 *           type: string
 *           default: taustakartta

 *       - in: query
 *         name: tileMatrixSet
 *         required: false
 *         schema:
 *           type: string
 *           default: WGS84_Pseudo-Mercator
 *       - in: query
 *         name: zoom
 *         required: false
 *         schema:
 *           type: number
 *           default: 17
 *       - in: query
 *         name: lat
 *         required: false
 *         schema:
 *           type: number
 *           default: 65.00816937
 *       - in: query
 *         name: lng
 *         required: false
 *         schema:
 *           type: number
 *           default: 25.46030678
 *     responses:
 *       200:
 *         description: JSON data returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/fetch-tile-by-lat-lng', controller.fetchTileByLatLng);


module.exports = router;
