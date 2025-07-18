const express = require('express');
const router = express.Router();
const controller = require('../controllers/MMLKartatController.js');


/**
 * @swagger
 * /api/kartat/fetch-tile/{layerName}/{tileMatrixSet}/{z}/{y}/{x}:
 *   get:
 *     summary: Fetch WMTS tile by XYZ tile coordinates
 *     tags:
 *       - kartat
 *     parameters:
 *       - in: path
 *         name: layerName
 *         required: true
 *         schema:
 *           type: string
 *           default: taustakartta
 *       - in: path
 *         name: tileMatrixSet
 *         required: true
 *         schema:
 *           type: string
 *           default: WGS84_Pseudo-Mercator
 *       - in: path
 *         name: z
 *         required: true
 *         schema:
 *           type: integer
 *           default: 17
 *       - in: path
 *         name: y
 *         required: true
 *         schema:
 *           type: integer
 *           default: 59151
 *       - in: path
 *         name: x
 *         required: true
 *         schema:
 *           type: integer
 *           default: 71415
 *     responses:
 *       200:
 *         description: Returns the tile image (PNG)
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get('/fetch-tile/:layerName/:tileMatrixSet/:zoom/:y/:x', controller.fetchTile);


module.exports = router;
