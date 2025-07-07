const express = require('express');
const router = express.Router();
const rakennusluokituksetController = require('../controllers/rakennusluokituksetController');

/**
 * @swagger
 * /api/rakennusluokitukset/{id}:
 *   get:
 *     summary: Get building luokitus data by ID
 *     tags:
 *       - Rakennusluokitukset
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the building to retrieve
 *     responses:
 *       200:
 *         description: Building data retrieved successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.get('/:id', rakennusluokituksetController.getLuokituksettById_Rakennus);

/**
 * @swagger
 * /api/rakennusluokitukset/{id_rakennus}:
 *   put:
 *     summary: Update rakennusluokitukset by id_rakennus using query parameters
 *     tags:
 *       - Rakennusluokitukset
 *     parameters:
 *       - in: path
 *         name: id_rakennus
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id_rakennus of the building to update
 *       - in: query
 *         name: rakennusluokitus
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: Rakennusluokitus value to update
 *       - in: query
 *         name: runkotapa
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: Runkotapa value to update
 *       - in: query
 *         name: kayttotilanne
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: Kayttotilanne value to update
 *       - in: query
 *         name: julkisivumateriaali
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: Julkisivumateriaali value to update
 *       - in: query
 *         name: lammitystapa
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: Lammitystapa value to update
 *       - in: query
 *         name: lammitysenergialahde
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: Lammitysenergialahde value to update
 *       - in: query
 *         name: rakennusaine
 *         schema:
 *           type: string
 *           maxLength: 2
 *         description: Rakennusaine value to update
 *     responses:
 *       200:
 *         description: Rakennusluokitukset updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rakennusluokitukset'
 *       404:
 *         description: Rakennus not found
 *       500:
 *         description: Server error
 */
router.put('/:id', rakennusluokituksetController.updateRakennusluokitukset);

module.exports = router;
