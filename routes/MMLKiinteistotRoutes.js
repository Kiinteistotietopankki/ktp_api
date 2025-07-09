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

/**
 * @swagger
 * /api/mml/lainhuutotiedot/ilmanhenkilotietoja/{kohdetunnus}:
 *   get:
 *     summary: Get lainhuutotiedot (without personal data) as XML
 *     tags: [MML Kiinteistot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: The kohdetunnus identifier
 *     responses:
 *       200:
 *         description: XML string of lainhuutotiedot
 *         content:
 *           application/xml:
 *             schema:
 *               type: string
 *       400:
 *         description: Missing kohdetunnus parameter
 *       500:
 *         description: Server error
 */
router.get('/lainhuutotiedot/ilmanhenkilotietoja/:kohdetunnus', mmlController.haeLainhuutotiedotIlmanhenkilotietoja);

/**
 * @swagger
 * /api/mml/lainhuutotiedot/ilmanhenkilotunnuksia/{kohdetunnus}:
 *   get:
 *     summary: Get lainhuutotiedot (without personal identity numbers) as XML
 *     tags: [MML Kiinteistot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: The kohdetunnus identifier
 *     responses:
 *       200:
 *         description: XML string of lainhuutotiedot
 *         content:
 *           application/xml:
 *             schema:
 *               type: string
 *       400:
 *         description: Missing kohdetunnus parameter
 *       500:
 *         description: Server error
 */
router.get('/lainhuutotiedot/ilmanhenkilotunnuksia/:kohdetunnus', mmlController.haeLainhuutotiedotIlmanhenkilotunnuksia);

module.exports = router;
