const express = require('express');
const router = express.Router();
const rakennustiedotController = require('../controllers/rakennustiedotController');

/**
 * @swagger
 * /api/rakennustiedot/{id}:
 *   get:
 *     summary: Get building data by ID
 *     tags:
 *       - Rakennustiedot
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the building to retrieve
 *     responses:
 *       200:
 *         description: Building data retrieved successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.get('/:id', rakennustiedotController.getRakennustiedotById_Rakennus);

/**
 * @swagger
 * /api/rakennustiedot/{id}:
 *   put:
 *     summary: Update building data by ID using query parameters
 *     tags:
 *       - Rakennustiedot
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Building ID to update
 *       - in: query
 *         name: rakennusvuosi
 *         schema:
 *           type: string
 *       - in: query
 *         name: kokonaisala
 *         schema:
 *           type: number
 *       - in: query
 *         name: kerrosala
 *         schema:
 *           type: number
 *       - in: query
 *         name: huoneistoala
 *         schema:
 *           type: number
 *       - in: query
 *         name: tilavuus
 *         schema:
 *           type: number
 *       - in: query
 *         name: kerroksia
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sijainti
 *         schema:
 *           type: string
 *         description: Geometry point in WKT format (e.g., 'POINT(24.93545 60.16952)')
 *     responses:
 *       200:
 *         description: Building updated successfully
 *       404:
 *         description: Building not found
 *       500:
 *         description: Server error
 */
router.put('/:id', rakennustiedotController.updateRakennustiedot);

module.exports = router;
