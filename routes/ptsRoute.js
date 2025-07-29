const express = require('express');
const router = express.Router();
const ptsController = require('../controllers/ptsController');

/**
 * @swagger
 * components:
 *   schemas:
 *     PTSEntry:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *         section:
 *           type: string
 *         label:
 *           type: string
 *         kl_rating:
 *           type: string
 *           nullable: true
 *         values_by_year:
 *           type: object
 *           additionalProperties:
 *             type: number
 *         metadata:
 *           type: object
 *
 *     PTSProjectCreate:
 *       type: object
 *       required:
 *         - kiinteistotunnus
 *         - title
 *         - created_by
 *         - entries
 *       properties:
 *         kiinteistotunnus:
 *           type: string
 *         title:
 *           type: string
 *         created_by:
 *           type: string
 *         entries:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PTSEntry'

 * /api/pts:
 *   post:
 *     summary: Create a new PTS project with entries
 *     tags: [PTS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PTSProjectCreate'
 *     responses:
 *       201:
 *         description: Created

 * /api/pts/{id}:
 *   get:
 *     summary: Get a PTS project with its entries
 *     tags: [PTS]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Found
 *       404:
 *         description: Not found

 *   put:
 *     summary: Update an existing PTS project and its entries
 *     tags: [PTS]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PTSProjectCreate'
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found

 *   delete:
 *     summary: Delete a PTS project
 *     tags: [PTS]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found

 * /api/pts/by/kiinteistotunnus/{kiinteistotunnus}:
 *   get:
 *     summary: Get all PTS projects by kiinteistotunnus
 *     tags: [PTS]
 *     parameters:
 *       - in: path
 *         name: kiinteistotunnus
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of PTS projects
 */

router.post('/', ptsController.create);
router.get('/:id', ptsController.getById);
router.put('/:id', ptsController.update);
router.delete('/:id', ptsController.remove);
router.get('/by/kiinteistotunnus/:kiinteistotunnus', ptsController.getByKiinteistotunnus);

module.exports = router;
