const express = require('express');
const router = express.Router();
const controller = require('../controllers/MMLHuoneistotIJController.js');

/**
 * @swagger
 * /api/mmlij/hae-kunnossapitoselvitykset:
 *   get:
 *     summary: haeKunnossapitoselvitykset (auto-generated route)
 *     tags:
 *       - mmlij
 *     parameters:
 *       - in: query
 *         name: ytunnus
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
router.get('/hae-kunnossapitoselvitykset', controller.haeKunnossapitoselvitykset);

/**
 * @swagger
 * /api/mmlij/hae-kunnossapitoselvitys:
 *   get:
 *     summary: haeKunnossapitoselvitys (auto-generated route)
 *     tags:
 *       - mmlij
 *     parameters:
 *       - in: query
 *         name: ytunnus
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: vuosi
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
router.get('/hae-kunnossapitoselvitys', controller.haeKunnossapitoselvitys);

/**
 * @swagger
 * /api/mmlij/tallenna-kunnossapitoselvitys:
 *   post:
 *     summary: tallennaKunnossapitoselvitys (auto-generated route)
 *     tags:
 *       - mmlij
 *     parameters:
 *       - in: query
 *         name: ytunnus
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: vuosi
 *         required: false
 *         schema:
 *           type: string
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
router.post('/tallenna-kunnossapitoselvitys', controller.tallennaKunnossapitoselvitys);

/**
 * @swagger
 * /api/mmlij/paivita-kunnossapitoselvitys:
 *   put:
 *     summary: paivitaKunnossapitoselvitys (auto-generated route)
 *     tags:
 *       - mmlij
 *     parameters:
 *       - in: query
 *         name: ytunnus
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: vuosi
 *         required: false
 *         schema:
 *           type: string
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
router.put('/paivita-kunnossapitoselvitys', controller.paivitaKunnossapitoselvitys);

/**
 * @swagger
 * /api/mmlij/hae-hanke:
 *   get:
 *     summary: haeHanke (auto-generated route)
 *     tags:
 *       - mmlij
 *     parameters:
 *       - in: query
 *         name: ytunnus
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: hanketunniste
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
router.get('/hae-hanke', controller.haeHanke);

/**
 * @swagger
 * /api/mmlij/paivita-hanke:
 *   put:
 *     summary: paivitaHanke (auto-generated route)
 *     tags:
 *       - mmlij
 *     parameters:
 *       - in: query
 *         name: ytunnus
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: hanketunniste
 *         required: false
 *         schema:
 *           type: string
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
router.put('/paivita-hanke', controller.paivitaHanke);

/**
 * @swagger
 * /api/mmlij/hae-hankkeet:
 *   get:
 *     summary: haeHankkeet (auto-generated route)
 *     tags:
 *       - mmlij
 *     parameters:
 *       - in: query
 *         name: ytunnus
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
router.get('/hae-hankkeet', controller.haeHankkeet);

/**
 * @swagger
 * /api/mmlij/tallenna-hankkeet:
 *   post:
 *     summary: tallennaHankkeet (auto-generated route)
 *     tags:
 *       - mmlij
 *     parameters:
 *       - in: query
 *         name: ytunnus
 *         required: false
 *         schema:
 *           type: string
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
router.post('/tallenna-hankkeet', controller.tallennaHankkeet);

/**
 * @swagger
 * /api/mmlij/hae-osakasremontit:
 *   get:
 *     summary: haeOsakasremontit (auto-generated route)
 *     tags:
 *       - mmlij
 *     parameters:
 *       - in: query
 *         name: ytunnus
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
router.get('/hae-osakasremontit', controller.haeOsakasremontit);

/**
 * @swagger
 * /api/mmlij/hae-koodisto-kpts:
 *   get:
 *     summary: haeKoodistoKPTS (auto-generated route)
 *     tags:
 *       - mmlij
 *     parameters:
 *       - in: query
 *         name: ytunnus
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: vuosi
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: koodistotunnus
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
router.get('/hae-koodisto-kpts', controller.haeKoodistoKPTS);

/**
 * @swagger
 * /api/mmlij/hae-koodisto-hanke:
 *   get:
 *     summary: haeKoodistoHanke (auto-generated route)
 *     tags:
 *       - mmlij
 *     parameters:
 *       - in: query
 *         name: ytunnus
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: hanketunniste
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: koodistotunnus
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
router.get('/hae-koodisto-hanke', controller.haeKoodistoHanke);

/**
 * @swagger
 * /api/mmlij/poista-kunnossapitoselvitys-versio:
 *   delete:
 *     summary: poistaKunnossapitoselvitysVersio (auto-generated route)
 *     tags:
 *       - mmlij
 *     parameters:
 *       - in: query
 *         name: ytunnus
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: vuosi
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: versioId
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
router.delete('/poista-kunnossapitoselvitys-versio', controller.poistaKunnossapitoselvitysVersio);

/**
 * @swagger
 * /api/mmlij/poista-hanke-versio:
 *   delete:
 *     summary: poistaHankeVersio (auto-generated route)
 *     tags:
 *       - mmlij
 *     parameters:
 *       - in: query
 *         name: ytunnus
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: hanketunniste
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: versioId
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
router.delete('/poista-hanke-versio', controller.poistaHankeVersio);

/**
 * @swagger
 * /api/mmlij/hae-hallintakohteet-ja-osakeryhmat:
 *   get:
 *     summary: haeHallintakohteetJaOsakeryhmat (auto-generated route)
 *     tags:
 *       - mmlij
 *     parameters:
 *       - in: query
 *         name: ytunnus
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
router.get('/hae-hallintakohteet-ja-osakeryhmat', controller.haeHallintakohteetJaOsakeryhmat);


module.exports = router;
