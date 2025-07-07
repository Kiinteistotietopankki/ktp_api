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
 *     summary: Update building data by ID using JSON payload
 *     tags:
 *       - Rakennustiedot
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Building ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rakennusvuosi:
 *                 type: string
 *                 description: Year of construction
 *               kokonaisala:
 *                 type: number
 *                 description: Total area
 *               kerrosala:
 *                 type: number
 *                 description: Floor area
 *               huoneistoala:
 *                 type: number
 *                 description: Apartment area
 *               tilavuus:
 *                 type: number
 *                 description: Volume
 *               kerroksia:
 *                 type: integer
 *                 description: Number of floors
 *               sijainti:
 *                 type: string
 *                 description: Geometry point in WKT format (e.g., 'POINT(24.93545 60.16952)')
 *           example:
 *             rakennusvuosi: "1980"
 *             kokonaisala: 250.5
 *             kerrosala: 200.0
 *             huoneistoala: 180.0
 *             tilavuus: 1500.0
 *             kerroksia: 3
 *             sijainti: "POINT(24.93545 60.16952)"
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
