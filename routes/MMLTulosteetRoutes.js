const express = require('express');
const router = express.Router();
const MMLTulosteetController = require('../controllers/MMLTulosteetController.js');


/**
 * @swagger
 * /api/mmltulosteet/lainhuutotodistus/henkilotiedoilla/{kohdetunnus}:
 *   get:
 *     summary: Get lainhuutotodistus as PDF (henkilötiedoilla)
 *     tags: [MML Kiinteistot - lainhuutotodistus]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: Kohdetunnus
 *     responses:
 *       200:
 *         description: PDF-tiedosto lainhuutotodistuksesta
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Virheellinen tai puuttuva kohdetunnus
 *       500:
 *         description: Palvelinvirhe
 */
router.get('/lainhuutotodistus/henkilotiedoilla/:kohdetunnus', MMLTulosteetController.haeLainhuutotodistus);

/**
 * @swagger
 * /api/mmltulosteet/lainhuutotodistus/ilmanhenkilotietoja/{kohdetunnus}:
 *   get:
 *     summary: Get lainhuutotodistus as PDF (ilman henkilötietoja)
 *     tags: [MML Kiinteistot - lainhuutotodistus]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: Kohdetunnus
 *     responses:
 *       200:
 *         description: PDF-tiedosto lainhuutotodistuksesta ilman henkilötietoja
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Virheellinen tai puuttuva kohdetunnus
 *       500:
 *         description: Palvelinvirhe
 */
router.get('/lainhuutotodistus/ilmanhenkilotietoja/:kohdetunnus', MMLTulosteetController.haeLainhuutotodistusIlmanHenkilotietoja);


/**
 * @swagger
 * /api/mmltulosteet/rasitustodistus/henkilotiedoilla/{kohdetunnus}:
 *   get:
 *     summary: Get rasitustodistus as PDF (henkilötiedoilla)
 *     tags: [MML Kiinteistot - rasitustodistus]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: Kohdetunnus
 *     responses:
 *       200:
 *         description: PDF-tiedosto rasitustodistuksesta
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Virheellinen tai puuttuva kohdetunnus
 *       500:
 *         description: Palvelinvirhe
 */
router.get('/rasitustodistus/henkilotiedoilla/:kohdetunnus', MMLTulosteetController.haeRasitustodistus);

/**
 * @swagger
 * /api/mmltulosteet/rasitustodistus/ilmanhenkilotietoja/{kohdetunnus}:
 *   get:
 *     summary: Get rasitustodistus as PDF (ilman henkilötietoja)
 *     tags: [MML Kiinteistot - rasitustodistus]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: Kohdetunnus
 *     responses:
 *       200:
 *         description: PDF-tiedosto rasitustodistuksesta ilman henkilötietoja
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Virheellinen tai puuttuva kohdetunnus
 *       500:
 *         description: Palvelinvirhe
 */
router.get('/rasitustodistus/ilmanhenkilotietoja/:kohdetunnus', MMLTulosteetController.haeRasitustodistusIlmanHenkilotietoja);

/**
 * @swagger
 * /api/mmltulosteet/vuokraoikeustodistus/henkilotiedoilla/{kohdetunnus}:
 *   get:
 *     summary: Get vuokraoikeustodistus as PDF (henkilötiedoilla)
 *     tags: [MML Kiinteistot - vuokraoikeustodistus]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: Kohdetunnus
 *     responses:
 *       200:
 *         description: PDF-tiedosto vuokraoikeustodistuksesta
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Virheellinen tai puuttuva kohdetunnus
 *       500:
 *         description: Palvelinvirhe
 */
router.get('/vuokraoikeustodistus/henkilotiedoilla/:kohdetunnus', MMLTulosteetController.haeVuokraoikeustodistus);


/**
 * @swagger
 * /api/mmltulosteet/vuokraoikeustodistus/ilmanhenkilotietoja/{kohdetunnus}:
 *   get:
 *     summary: Get vuokraoikeustodistus as PDF (ilman henkilötietoja)
 *     tags: [MML Kiinteistot - vuokraoikeustodistus]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: Kohdetunnus
 *     responses:
 *       200:
 *         description: PDF-tiedosto vuokraoikeustodistuksesta ilman henkilötietoja
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Virheellinen tai puuttuva kohdetunnus
 *       500:
 *         description: Palvelinvirhe
 */
router.get('/vuokraoikeustodistus/ilmanhenkilotietoja/:kohdetunnus', MMLTulosteetController.haeVuokraoikeustodistusIlmanHenkilotietoja);











module.exports = router;