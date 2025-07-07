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
 *     summary: Update rakennusluokitukset by id_rakennus using JSON payload
 *     tags:
 *       - Rakennusluokitukset
 *     parameters:
 *       - in: path
 *         name: id_rakennus
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the building to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rakennusluokitus:
 *                 type: string
 *                 maxLength: 2
 *                 enum: ["01", "02", "03", "04", "05", "06", "07"]
 *                 example: "05"
 *               runkotapa:
 *                 type: string
 *                 maxLength: 2
 *                 enum: ["01", "02"]
 *                 example: "01"
 *               kayttotilanne:
 *                 type: string
 *                 maxLength: 2
 *                 enum: ["01","02","03","04","05","06","07","08","09","10","11"]
 *                 example: "01"
 *               julkisivumateriaali:
 *                 type: string
 *                 maxLength: 2
 *                 enum: ["00","01","02","03","04","05","06","99"]
 *                 example: "01"
 *               lammitystapa:
 *                 type: string
 *                 maxLength: 2
 *                 enum: ["01","02","03","04","05","06","07","99"]
 *                 example: "03"
 *               lammitysenergialahde:
 *                 type: string
 *                 maxLength: 2
 *                 enum: ["01","02","03","04","05","06","07","08","09","10","11","99"]
 *                 example: "04"
 *               rakennusaine:
 *                 type: string
 *                 maxLength: 2
 *                 enum: ["00","01","02","03","04","99"]
 *                 example: "01"
 *     responses:
 *       200:
 *         description: Rakennusluokitukset updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Rakennus not found
 *       500:
 *         description: Server error
 */

router.put('/:id', rakennusluokituksetController.updateRakennusluokitukset);


module.exports = router;
