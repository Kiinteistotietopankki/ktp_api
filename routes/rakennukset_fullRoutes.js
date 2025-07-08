const express = require('express');
const router = express.Router();
const rakennukset_fullController = require('../controllers/rakennukset_fullController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Rakennukset_full:
 *       type: object
 *       properties:
 *         id_rakennus:
 *           type: integer
 *         id_kiinteisto:
 *           type: integer
 *         rakennustunnus:
 *           type: string
 *         osoite:
 *           type: string
 *         toimipaikka:
 *           type: string
 *         postinumero:
 *           type: integer
 *         rakennusvuosi:
 *           type: string
 *         kokonaisala:
 *           type: number
 *         kerrosala:
 *           type: number
 *         huoneistoala:
 *           type: number
 *         tilavuus:
 *           type: number
 *         kerroksia:
 *           type: number
 *         sijainti:
 *           type: string
 *         rakennusluokitus:
 *           type: string
 *         runkotapa:
 *           type: string
 *         kayttotilanne:
 *           type: string
 *         julkisivumateriaali:
 *           type: string
 *         lammitystapa:
 *           type: string
 *         lammitysenergialahde:
 *           type: string
 *         rakennusaine:
 *           type: string
 *         id_kiinteisto_kiinteistot:
 *           type: string

 *     Rakennukset_full_create:
 *       type: object
 *       properties:
 *         id_kiinteisto:
 *           type: integer
 *         rakennustunnus:
 *           type: string
 *         osoite:
 *           type: string
 *         toimipaikka:
 *           type: string
 *         postinumero:
 *           type: integer
 *         rakennusvuosi:
 *           type: string
 *         kokonaisala:
 *           type: number
 *         kerrosala:
 *           type: number
 *         huoneistoala:
 *           type: number
 *         tilavuus:
 *           type: number
 *         kerroksia:
 *           type: number
 *         sijainti:
 *           type: string
 *         rakennusluokitus:
 *           type: string
 *         runkotapa:
 *           type: string
 *         kayttotilanne:
 *           type: string
 *         julkisivumateriaali:
 *           type: string
 *         lammitystapa:
 *           type: string
 *         lammitysenergialahde:
 *           type: string
 *         rakennusaine:
 *           type: string
 *         id_kiinteisto_kiinteistot:
 *           type: string

 *
 * /api/rakennukset_full:
 *   get:
 *     summary: Get all rakennukset_full
 *     tags: [Rakennukset_full]
 *     responses:
 *       200:
 *         description: List of all rakennukset_full
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rakennukset_full'
 */
router.get('/', rakennukset_fullController.getAll);

/**
 * @swagger
 * /api/rakennukset_full/by/id/{id}:
 *   get:
 *     summary: Get a single rakennukset_full by ID
 *     tags: [Rakennukset_full]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single rakennukset_full
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rakennukset_full'
 */
router.get('/by/id/:id', rakennukset_fullController.getById);

/**
 * @swagger
 * /api/rakennukset_full/by/id_kiinteisto/{id}:
 *   get:
 *     summary: Get rakennukset_full by id_kiinteisto
 *     tags: [Rakennukset_full]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single rakennukset_full
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rakennukset_full'
 */
router.get('/by/id_kiinteisto/:id', rakennukset_fullController.getById_kiinteisto);

/**
 * @swagger
 * /api/rakennukset_full/by/id_kiinteisto_with_metadata/{id_kiinteisto}:
 *   get:
 *     summary: Get rakennukset_full by id_kiinteisto with metadata
 *     tags: [Rakennukset_full]
 *     parameters:
 *       - in: path
 *         name: id_kiinteisto
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the kiinteisto
 *     responses:
 *       200:
 *         description: List of rakennukset_full with metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Rakennukset_full'
 *                   - type: object
 *                     properties:
 *                       metadata:
 *                         type: object
 *                         description: Metadata object for each rakennus
 */
router.get('/by/id_kiinteisto_with_metadata/:id_kiinteisto', rakennukset_fullController.getById_kiinteistoWithMetadata);

/**
 * @swagger
 * /api/rakennukset_full:
 *   post:
 *     summary: Create a new rakennukset_full
 *     tags: [Rakennukset_full]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rakennukset_full_create'
 *     responses:
 *       201:
 *         description: Created rakennukset_full
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rakennukset_full'
 */
router.post('/', rakennukset_fullController.create);

/**
 * @swagger
 * /api/rakennukset_full/{id}:
 *   put:
 *     summary: Update an existing rakennukset_full by ID
 *     tags: [Rakennukset_full]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rakennukset_full_create'
 *     responses:
 *       200:
 *         description: Updated rakennukset_full
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rakennukset_full'
 */
router.put('/:id', rakennukset_fullController.update);

/**
 * @swagger
 * /api/rakennukset_full/{id}:
 *   delete:
 *     summary: Delete a rakennukset_full by ID
 *     tags: [Rakennukset_full]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted rakennukset_full
 */
router.delete('/:id', rakennukset_fullController.remove);

module.exports = router;
