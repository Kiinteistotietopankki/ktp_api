// routes/rakennukset.js

const express = require('express');
const router = express.Router();
const rakennuksetController = require('../controllers/rakennusController');

/**
 * @swagger
 * tags:
 *   name: Rakennukset
 *   description: Rakennus resource management
 */

/**
 * @swagger
 * /api/rakennukset:
 *   get:
 *     summary: Get all rakennukset
 *     tags: [Rakennukset]
 *     responses:
 *       200:
 *         description: A list of all rakennukset
 */
router.get('/', rakennuksetController.getAllRakennukset);

/**
 * @swagger
 * /api/rakennukset/id_kiinteisto/{kiinteistoId}:
 *   get:
 *     summary: Get all rakennukset by kiinteistö ID
 *     tags: [Rakennukset]
 *     parameters:
 *       - in: path
 *         name: kiinteistoId
 *         required: true
 *         description: Kiinteistö ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of rakennukset for the specified kiinteistö
 */
router.get('/id_kiinteisto/:id', rakennuksetController.findRakennusByKiinteistoId);


/**
 * @swagger
 * /api/rakennukset/{id}:
 *   get:
 *     summary: Get a single rakennus by ID
 *     tags: [Rakennukset]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Rakennus ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rakennus found
 *       404:
 *         description: Rakennus not found
 */
router.get('/:id', rakennuksetController.getRakennusById);



/**
 * @swagger
 * /api/rakennukset:
 *   post:
 *     summary: Create a new rakennus
 *     tags: [Rakennukset]
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
 *             required:
 *               - id_kiinteisto
 *               - rakennustunnus
 *               - osoite
 *     responses:
 *       201:
 *         description: Rakennus created
 */
router.post('/', rakennuksetController.createRakennus);

/**
 * @swagger
 * /api/rakennukset/{id}:
 *   put:
 *     summary: Update a rakennus by ID
 *     tags: [Rakennukset]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Rakennus ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rakennustunnus:
 *                 type: string
 *               osoite:
 *                 type: string
 *               toimipaikka:
 *                 type: string
 *               postinumero:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Rakennus updated
 *       404:
 *         description: Rakennus not found
 */
router.put('/:id', rakennuksetController.updateRakennus);

/**
 * @swagger
 * /api/rakennukset/{id}:
 *   delete:
 *     summary: Delete a rakennus by ID
 *     tags: [Rakennukset]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Rakennus ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Rakennus deleted
 *       404:
 *         description: Rakennus not found
 */
router.delete('/:id', rakennuksetController.deleteRakennus);

module.exports = router;
