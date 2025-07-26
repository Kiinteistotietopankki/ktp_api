const express = require('express');
const router = express.Router();
const controller = require('../controllers/kiinteistoHakuController.js');

/**
 * @swagger
 * /api/haku/hae-kiinteistoja:
 *   get:
 *     summary: haeKiinteistoja (auto-generated route)
 *     tags:
 *       - haku
 *     parameters:
 *       - in: query
 *         name: kiinteistotunnus
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: osoite
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: kaupunki
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: JSON data returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/hae-kiinteistoja', controller.haeKiinteistoja);


module.exports = router;
