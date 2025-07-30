const express = require('express');
const router = express.Router();
const mmlController = require('../controllers/MMLKiinteistotController.js');

// Perustiedot

/**
 * @swagger
 * /api/mml/perustiedot/{kohdetunnus}:
 *   get:
 *     summary: Get perustiedot JSON data for a given kohdetunnus
 *     tags: [MML Kiinteistot - perustiedot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: Kohdetunnus, jonka perustiedot haetaan
 *     responses:
 *       200:
 *         description: JSON-data palautettu
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Virheellinen tai puuttuva kohdetunnus
 *       500:
 *         description: Palvelinvirhe
 */
router.get('/perustiedot/:kohdetunnus', mmlController.haePerustiedot);


/**
 * @swagger
 * /api/mml/rekisteriyksikko/{kohdetunnus}:
 *   get:
 *     summary: Hae rekisteriyksikkö kohdetunnuksella
 *     tags: [MML Kiinteistot - perustiedot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: Kohdetunnus, jolla rekisteriyksikkö haetaan
 *     responses:
 *       200:
 *         description: JSON-data palautettu
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Virheellinen tai puuttuva kohdetunnus
 *       500:
 *         description: Palvelinvirhe
 */
router.get('/rekisteriyksikko/:kohdetunnus', mmlController.haeRekisteriyksikkoa);

/**
 * @swagger
 * /api/mml/maara_ala/{kohdetunnus}:
 *   get:
 *     summary: Hae määräala kohdetunnuksella
 *     tags: [MML Kiinteistot - perustiedot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: Kohdetunnus, jolla määräala haetaan
 *     responses:
 *       200:
 *         description: JSON-data palautettu
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Virheellinen tai puuttuva kohdetunnus
 *       500:
 *         description: Palvelinvirhe
 */
router.get('/maara_ala/:kohdetunnus', mmlController.haeMaara_alaa);

/**
 * @swagger
 * /api/mml/laitos/{kohdetunnus}:
 *   get:
 *     summary: Hae laitos kohdetunnuksella
 *     tags: [MML Kiinteistot - perustiedot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: Kohdetunnus, jolla laitos haetaan
 *     responses:
 *       200:
 *         description: JSON-data palautettu
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Virheellinen tai puuttuva kohdetunnus
 *       500:
 *         description: Palvelinvirhe
 */
router.get('/laitos/:kohdetunnus', mmlController.haeLaitosta);

/**
 * @swagger
 * /api/mml/yhteystieto/{kohdetunnus}:
 *   get:
 *     summary: Hae yhteystieto kohdetunnuksella
 *     tags: [MML Kiinteistot - perustiedot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: Kohdetunnus, jolla yhteystiedot haetaan
 *     responses:
 *       200:
 *         description: JSON-data palautettu
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Virheellinen tai puuttuva kohdetunnus
 *       500:
 *         description: Palvelinvirhe
 */
router.get('/yhteystieto/:kohdetunnus', mmlController.haeYhteystiedot);

// Lainhuutotiedot

/**
 * @swagger
 * /api/mml/lainhuutotiedot/ilmanhenkilotietoja/{kohdetunnus}:
 *   get:
 *     summary: Get lainhuutotiedot (without personal data) as JSON
 *     tags: [MML Kiinteistot - lainhuutotiedot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: Kohdetunnus
 *     responses:
 *       200:
 *         description: JSON-data palautettu ilman henkilötietoja
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Virheellinen tai puuttuva kohdetunnus
 *       500:
 *         description: Palvelinvirhe
 */
router.get('/lainhuutotiedot/ilmanhenkilotietoja/:kohdetunnus', mmlController.haeLainhuutotiedotIlmanhenkilotietoja);

/**
 * @swagger
 * /api/mml/lainhuutotiedot/ilmanhenkilotunnuksia/{kohdetunnus}:
 *   get:
 *     summary: Get lainhuutotiedot (without personal identity numbers) as JSON
 *     tags: [MML Kiinteistot - lainhuutotiedot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: Kohdetunnus
 *     responses:
 *       200:
 *         description: JSON-data palautettu ilman henkilötunnuksia
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Virheellinen tai puuttuva kohdetunnus
 *       500:
 *         description: Palvelinvirhe
 */
router.get('/lainhuutotiedot/ilmanhenkilotunnuksia/:kohdetunnus', mmlController.haeLainhuutotiedotIlmanhenkilotunnuksia);

/**
 * @swagger
 * /api/mml/lainhuutotiedot/henkilotunnuksilla/{kohdetunnus}:
 *   get:
 *     summary: Get lainhuutotiedot with all personal data
 *     tags: [MML Kiinteistot - lainhuutotiedot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *         description: Kohdetunnus
 *     responses:
 *       200:
 *         description: JSON-data palautettu kaikkine henkilötietoineen
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Virheellinen tai puuttuva kohdetunnus
 *       500:
 *         description: Palvelinvirhe
 */
router.get('/lainhuutotiedot/henkilotunnuksilla/:kohdetunnus', mmlController.haeLainhuutotiedotHenkilotunnuksilla);

// Rasitustiedot

/**
 * @swagger
 * /api/mml/rasitustiedot/ilmanhenkilotietoja/{kohdetunnus}:
 *   get:
 *     summary: Get rasitustiedot (without personal data) as JSON
 *     tags: [MML Kiinteistot - rasitustiedot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: JSON-data palautettu
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.get('/rasitustiedot/ilmanhenkilotietoja/:kohdetunnus', mmlController.haeRasitustiedotIlmanhenkilotietoja);

/**
 * @swagger
 * /api/mml/rasitustiedot/ilmanhenkilotunnuksia/{kohdetunnus}:
 *   get:
 *     summary: Get rasitustiedot (without personal identity numbers) as JSON
 *     tags: [MML Kiinteistot - rasitustiedot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: JSON-data palautettu
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.get('/rasitustiedot/ilmanhenkilotunnuksia/:kohdetunnus', mmlController.haeRasitustiedotIlmanhenkilotunnuksia);

/**
 * @swagger
 * /api/mml/rasitustiedot/henkilotunnuksilla/{kohdetunnus}:
 *   get:
 *     summary: Get rasitustiedot with all personal data
 *     tags: [MML Kiinteistot - rasitustiedot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: JSON-data palautettu
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.get('/rasitustiedot/henkilotunnuksilla/:kohdetunnus', mmlController.haeRasitustiedotHenkilotunnuksilla);

//Vuokraoikeustiedot

/**
 * @swagger
 * /api/mml/vuokraoikeustiedot/ilmanhenkilotietoja/{kohdetunnus}:
 *   get:
 *     summary: Get vuokraoikeustiedot (without personal data) as JSON
 *     tags: [MML Kiinteistot - vuokraoikeustiedot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: JSON-data palautettu
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.get('/vuokraoikeustiedot/ilmanhenkilotietoja/:kohdetunnus', mmlController.haeVuokraoikeustiedotIlmanhenkilotietoja);

/**
 * @swagger
 * /api/mml/vuokraoikeustiedot/ilmanhenkilotunnuksia/{kohdetunnus}:
 *   get:
 *     summary: Get vuokraoikeustiedot (without personal identity numbers) as JSON
 *     tags: [MML Kiinteistot - vuokraoikeustiedot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: JSON-data palautettu
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.get('/vuokraoikeustiedot/ilmanhenkilotunnuksia/:kohdetunnus', mmlController.haeVuokraoikeustiedotIlmanhenkilotunnuksia);

/**
 * @swagger
 * /api/mml/vuokraoikeustiedot/henkilotunnuksilla/{kohdetunnus}:
 *   get:
 *     summary: Get vuokraoikeustiedot with all personal data
 *     tags: [MML Kiinteistot - vuokraoikeustiedot]
 *     parameters:
 *       - in: path
 *         name: kohdetunnus
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: json-data palautettu
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.get('/vuokraoikeustiedot/henkilotunnuksilla/:kohdetunnus', mmlController.haeVuokraoikeustiedotHenkilotunnuksilla);

module.exports = router;
