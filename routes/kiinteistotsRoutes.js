const express = require('express');
const router = express.Router();
const kiinteistotController = require('../controllers/kiinteistotController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Kiinteistot:
 *       type: object
 *       properties:
 *         id_kiinteisto:
 *           type: integer
 *         kiinteistotunnus:
 *           type: string
 *         rakennuksets:
 *           type: array
 *         rakennukset_fulls:
 *           type: array

 *     Kiinteistot_create:
 *       type: object
 *       properties:
 *         kiinteistotunnus:
 *           type: string
 *         rakennuksets:
 *           type: array
 *         rakennukset_fulls:
 *           type: array

 *
 * /api/kiinteistots:
 *   get:
 *     summary: Get all kiinteistots
 *     tags: [Kiinteistots]
 *     responses:
 *       200:
 *         description: List of all kiinteistots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Kiinteistot'
 */
router.get('/', kiinteistotController.getAll);

/**
 * @swagger
 * /api/kiinteistots/{id}:
 *   get:
 *     summary: Get a single kiinteistot by ID
 *     tags: [Kiinteistots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single kiinteistot
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Kiinteistot'
 */
router.get('/:id', kiinteistotController.getById);

/**
 * @swagger
 * /api/kiinteistots:
 *   post:
 *     summary: Create a new kiinteistot
 *     tags: [Kiinteistots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Kiinteistot_create'
 *     responses:
 *       201:
 *         description: Created kiinteistot
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Kiinteistot'
 */
router.post('/', kiinteistotController.create);

/**
 * @swagger
 * /api/kiinteistots/{id}:
 *   put:
 *     summary: Update an existing kiinteistot by ID
 *     tags: [Kiinteistots]
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
 *             $ref: '#/components/schemas/Kiinteistot_create'
 *     responses:
 *       200:
 *         description: Updated kiinteistot
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Kiinteistot'
 */
router.put('/:id', kiinteistotController.update);

/**
 * @swagger
 * /api/kiinteistots/{id}:
 *   delete:
 *     summary: Delete a kiinteistot by ID
 *     tags: [Kiinteistots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted kiinteistot
 */
router.delete('/:id', kiinteistotController.remove);

module.exports = router;
