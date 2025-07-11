const express = require('express');
const router = express.Router();
const controller = require('../controllers/MMLTilastotController.js');



/**
 * @swagger
 * /api/tilastot/get-indicator-value-by-kunta-name:
 *   get:
 *     summary: getIndicatorValueByKuntaName (auto-generated route)
 *     tags:
 *       - Generated
 *     parameters:
 *       - in: query
 *         name: indicatorId
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: kuntaName
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: years
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: JSON data returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/get-indicator-value-by-kunta-name', controller.getIndicatorValueByKuntaName);


module.exports = router;
