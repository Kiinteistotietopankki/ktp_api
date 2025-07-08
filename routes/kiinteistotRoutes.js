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
 * /api/kiinteistot:
 *   get:
 *     summary: Get all kiinteistot
 *     tags: [Kiinteistot]
 *     responses:
 *       200:
 *         description: List of all kiinteistot
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
 * /api/kiinteistot/with-rakennukset:
 *   get:
 *     summary: Get paginated list of kiinteistot with rakennukset included
 *     tags: [Kiinteistot]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (starts at 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 100
 *         description: Number of items per page (max 100)
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           default: id_kiinteisto
 *         description: Field to order by
 *       - in: query
 *         name: orderDir
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Order direction (ascending or descending)
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *           default: ""
 *         description: Search by kiinteistotunnus (with hyphen) or rakennukset fields (toimipaikka, osoite, postinumero)
 *     responses:
 *       200:
 *         description: Paginated list of kiinteistot with rakennukset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Kiinteistot'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 */
router.get('/with-rakennukset', kiinteistotController.getAllWithRakennukset);

/**
 * @swagger
 * /api/kiinteistot/by/id/{id}:
 *   get:
 *     summary: Get a single kiinteisto by id
 *     tags: [Kiinteistot]
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
router.get('/by/id/:id', kiinteistotController.getById);



/**
 * @swagger
 * /api/kiinteistot/with-rakennukset/by/id/{id}:
 *   get:
 *     summary: Get a single kiinteisto by id with rakennukset
 *     tags: [Kiinteistot]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single kiinteistot with rakennukset
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Kiinteistot'
 */
router.get('/with-rakennukset/by/id/:id', kiinteistotController.getByIdWithRakennukset);


/**
 * @swagger
 * /api/kiinteistot/with-rakennukset:
 *   post:
 *     summary: Create a new kiinteisto along with rakennukset_fulls
 *     tags: [Kiinteistot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Kiinteistot_create'
 *     responses:
 *       201:
 *         description: Created kiinteisto with rakennukset_fulls
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Kiinteistot'
 *       500:
 *         description: Server error
 */
router.post('/with-rakennukset', kiinteistotController.createWithRakennukset);

/**
 * @swagger
 * /api/kiinteistot:
 *   post:
 *     summary: Create a new kiinteistot
 *     tags: [Kiinteistot]
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
 * /api/kiinteistot/{id}:
 *   put:
 *     summary: Update an existing kiinteistot by ID
 *     tags: [Kiinteistot]
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
 * /api/kiinteistot/{id}:
 *   delete:
 *     summary: Delete a kiinteistot by ID
 *     tags: [Kiinteistot]
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
