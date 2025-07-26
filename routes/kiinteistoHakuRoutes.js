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

/**
 * @swagger
 * /api/haku/fetch-osoite-data:
 *   get:
 *     summary: fetchOsoiteData (auto-generated route)
 *     tags:
 *       - haku
 *     parameters:
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
router.get('/fetch-osoite-data', controller.fetchOsoiteData);

/**
 * @swagger
 * /api/haku/extract-building-keys:
 *   get:
 *     summary: extractBuildingKeys (auto-generated route)
 *     tags:
 *       - haku
 *     parameters:
 *       - in: query
 *         name: osoiteData
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
router.get('/extract-building-keys', controller.extractBuildingKeys);

/**
 * @swagger
 * /api/haku/extract-address-keys:
 *   get:
 *     summary: extractAddressKeys (auto-generated route)
 *     tags:
 *       - haku
 *     parameters:
 *       - in: query
 *         name: osoiteData
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
router.get('/extract-address-keys', controller.extractAddressKeys);

/**
 * @swagger
 * /api/haku/hae-kiinteistotunnukset:
 *   get:
 *     summary: haeKiinteistotunnukset (auto-generated route)
 *     tags:
 *       - haku
 *     parameters:
 *       - in: query
 *         name: buildingKeys
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
router.get('/hae-kiinteistotunnukset', controller.haeKiinteistotunnukset);

/**
 * @swagger
 * /api/haku/fetch-building-key-data:
 *   get:
 *     summary: fetchBuildingKeyData (auto-generated route)
 *     tags:
 *       - haku
 *     parameters:
 *       - in: query
 *         name: key
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
router.get('/fetch-building-key-data', controller.fetchBuildingKeyData);

/**
 * @swagger
 * /api/haku/extract-tunnus:
 *   get:
 *     summary: extractTunnus (auto-generated route)
 *     tags:
 *       - haku
 *     parameters:
 *       - in: query
 *         name: data
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
router.get('/extract-tunnus', controller.extractTunnus);

/**
 * @swagger
 * /api/haku/create-kiinteistot:
 *   get:
 *     summary: createKiinteistot (auto-generated route)
 *     tags:
 *       - haku
 *     parameters:
 *       - in: query
 *         name: kiinteistotunnukset
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: addresskeys
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: osoite
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
router.get('/create-kiinteistot', controller.createKiinteistot);

/**
 * @swagger
 * /api/haku/create-kiinteistot-without-address:
 *   get:
 *     summary: createKiinteistotWithoutAddress (auto-generated route)
 *     tags:
 *       - haku
 *     parameters:
 *       - in: query
 *         name: kiinteistotunnukset
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
router.get('/create-kiinteistot-without-address', controller.createKiinteistotWithoutAddress);


module.exports = router;
