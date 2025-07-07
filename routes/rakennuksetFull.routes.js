const express = require('express');
const router = express.Router();
const controller = require('../controllers/rakennuksetFull.controller');

/**
 * @swagger
 * tags:
 *   name: RakennuksetFull
 *   description: RakennuksetFull API
 */

/**
 * @swagger
 * /rakennukset_full:
 *   get:
 *     summary: Get all rakennukset_full entries
 *     tags: [RakennuksetFull]
 *     responses:
 *       200:
 *         description: List of rakennukset
 */
router.get('/', controller.getAll.bind(controller));

/**
 * @swagger
 * /rakennukset_full/{id}:
 *   get:
 *     summary: Get rakennus by id
 *     tags: [RakennuksetFull]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Rakennus ID
 *     responses:
 *       200:
 *         description: Rakennus object
 *       404:
 *         description: Rakennus not found
 */
router.get('/:id', controller.getById.bind(controller));

/**
 * @swagger
 * /rakennukset_full:
 *   post:
 *     summary: Create a new rakennus
 *     tags: [RakennuksetFull]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_kiinteisto:
 *                 type: integer
 *               rakennustunnus:
 *                 type: string
 *               osoite:
 *                 type: string
 *               toimipaikka:
 *                 type: string
 *               postinumero:
 *                 type: integer
 *               rakennusvuosi:
 *                 type: string
 *               kokonaisala:
 *                 type: number
 *                 format: float
 *               kerrosala:
 *                 type: number
 *                 format: float
 *               huoneistoala:
 *                 type: number
 *                 format: float
 *               tilavuus:
 *                 type: number
 *                 format: float
 *               kerroksia:
 *                 type: integer
 *               sijainti:
 *                 type: string
 *                 description: POINT as WKT or GeoJSON (depends on your parser)
 *               rakennusluokitus:
 *                 type: string
 *               runkotapa:
 *                 type: string
 *               kayttotilanne:
 *                 type: string
 *               julkisivumateriaali:
 *                 type: string
 *               lammitystapa:
 *                 type: string
 *               lammitysenergialahde:
 *                 type: string
 *               rakennusaine:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.post('/', controller.create.bind(controller));

/**
 * @swagger
 * /rakennukset_full/{id}:
 *   put:
 *     summary: Update rakennus by id
 *     tags: [RakennuksetFull]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Rakennus ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # same schema as POST, omitted here for brevity
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: Rakennus not found
 */
router.put('/:id', controller.update.bind(controller));

/**
 * @swagger
 * /rakennukset_full/{id}:
 *   delete:
 *     summary: Delete rakennus by id
 *     tags: [RakennuksetFull]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Rakennus ID
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       404:
 *         description: Rakennus not found
 */
router.delete('/:id', controller.delete.bind(controller));

module.exports = router;
