const express = require('express');
const router = express.Router();
const row_metadataController = require('../controllers/row_metadataController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Row_metadata:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         table_name:
 *           type: string
 *         row_id:
 *           type: integer
 *         metadata:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string

 *     Row_metadata_create:
 *       type: object
 *       properties:
 *         table_name:
 *           type: string
 *         row_id:
 *           type: integer
 *         metadata:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string

 *
 * /api/row_metadata:
 *   get:
 *     summary: Get all row_metadata
 *     tags: [Row_metadata]
 *     responses:
 *       200:
 *         description: List of all row_metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Row_metadata'
 */
router.get('/', row_metadataController.getAll);

/**
 * @swagger
 * /api/row_metadata/by/{id}:
 *   get:
 *     summary: Get a single row_metadata by ID
 *     tags: [Row_metadata]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single row_metadata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Row_metadata'
 */
router.get('/by/:id', row_metadataController.getById);

/**
 * @swagger
 * /api/row_metadata:
 *   post:
 *     summary: Create a new row_metadata
 *     tags: [Row_metadata]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Row_metadata_create'
 *     responses:
 *       201:
 *         description: Created row_metadata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Row_metadata'
 */
router.post('/', row_metadataController.create);

/**
 * @swagger
 * /api/row_metadata/{id}:
 *   put:
 *     summary: Update an existing row_metadata by ID
 *     tags: [Row_metadata]
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
 *             $ref: '#/components/schemas/Row_metadata_create'
 *     responses:
 *       200:
 *         description: Updated row_metadata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Row_metadata'
 */
router.put('/:id', row_metadataController.update);

/**
 * @swagger
 * /api/row_metadata/{id}:
 *   delete:
 *     summary: Delete a row_metadata by ID
 *     tags: [Row_metadata]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted row_metadata
 */
router.delete('/:id', row_metadataController.remove);

module.exports = router;
