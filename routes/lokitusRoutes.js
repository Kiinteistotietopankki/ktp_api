const express = require('express');
const router = express.Router();
const lokitusController = require('../controllers/lokitusController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Lokitus:
 *       type: object
 *       properties:
 *         id_loki:
 *           type: integer
 *         userId:
 *           type: string
 *         pvm:
 *           type: string
 *         message:
 *           type: string
 *         timeStampUTC:
 *           type: string
 *         timeStampFinnish:
 *           type: string
 *         responseField:
 *           type: string

 *     Lokitus_create:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         pvm:
 *           type: string
 *         message:
 *           type: string
 *         timeStampUTC:
 *           type: string
 *         timeStampFinnish:
 *           type: string
 *         responseField:
 *           type: string
 */

/**
 * @swagger
 * /api/lokitus:
 *   get:
 *     summary: Get paginated list of lokitus
 *     tags: [Lokitus]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of items per page (max 100)
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           default: id_loki
 *         description: Field to sort by
 *       - in: query
 *         name: orderDir
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Sort direction
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search term for filtering results (searches userId and message fields)
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Exact userId to filter results by
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date (inclusive) filter for pvm field
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date (inclusive) filter for pvm field
 *     responses:
 *       200:
 *         description: Paginated list of lokitus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Lokitus'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 */
router.get('/', lokitusController.getAll);

/**
 * @swagger
 * /api/lokitus/by/{id}:
 *   get:
 *     summary: Get a single lokitus by ID
 *     tags: [Lokitus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single lokitus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lokitus'
 */
router.get('/by/:id', lokitusController.getById);

/**
 * @swagger
 * /api/lokitus:
 *   post:
 *     summary: Create a new lokitus
 *     tags: [Lokitus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lokitus_create'
 *     responses:
 *       201:
 *         description: Created lokitus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lokitus'
 */
router.post('/', lokitusController.create);

/**
 * @swagger
 * /api/lokitus/{id}:
 *   put:
 *     summary: Update an existing lokitus by ID
 *     tags: [Lokitus]
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
 *             $ref: '#/components/schemas/Lokitus_create'
 *     responses:
 *       200:
 *         description: Updated lokitus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lokitus'
 */
router.put('/:id', lokitusController.update);

/**
 * @swagger
 * /api/lokitus/{id}:
 *   delete:
 *     summary: Delete a lokitus by ID
 *     tags: [Lokitus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted lokitus
 */
router.delete('/:id', lokitusController.remove);

module.exports = router;
