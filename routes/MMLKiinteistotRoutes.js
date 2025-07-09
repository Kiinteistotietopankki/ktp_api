const express = require('express');
const router = express.Router();
const mmlController = require('../controllers/MMLKiinteistotController');

/**
 * @swagger
 * /api/mml/perustiedot/{kohdetunnus}:
 *   get:
 *     summary: Get perustiedot XML data for a given kohdetunnus
 *     tags: [MML Kiinteistot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: The kohdetunnus identifier to fetch perustiedot for
 *     responses:
 *       200:
 *         description: XML string of perustiedot
 *         content:
 *           application/xml:
 *             schema:
 *               type: string
 *       400:
 *         description: Missing kohdetunnus parameter
 *       500:
 *         description: Server error
 */
router.get('/perustiedot/:kohdetunnus', mmlController.haePerustiedot);

module.exports = router;
