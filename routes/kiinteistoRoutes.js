const express = require('express');
const router = express.Router();
const kiinteistotController = require('../controllers/kiinteistoController');
const authMiddleware = require('../middlewares/authMiddleware');
const apikeyMiddleware = require('../middlewares/checkApikey')
const requestLogger = require('../middlewares/loggerMiddleware')

// router.use(authMiddleware);
// router.use(apikeyMiddleware);


/**
 * @swagger
 * /api/kiinteistot/default:
 *   get:
 *     summary: Get all kiinteistöt
 *     tags: [Kiinteistöt]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1 
 *         required: false
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 5
 *         required: false
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of kiinteistöt with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                   example: 8
 *                 totalPages:
 *                   type: integer
 *                   example: 2
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_kiinteisto:
 *                         type: integer
 *                         example: 89
 *                       kiinteistotunnus:
 *                         type: string
 *                         example: "854-407-39-3"
 */
router.get('/default', kiinteistotController.getAllKiinteistot);

/**
 * @swagger
 * /api/kiinteistot/default/{id}:
 *   get:
 *     summary: Get kiinteistö by ID
 *     tags: [Kiinteistöt]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single kiinteistö
 */
router.get('/default/:id', kiinteistotController.getKiinteistoById);


/**
 * @swagger
 * /api/kiinteistot/default/{id}:
 *   delete:
 *     summary: Delete kiinteistö by ID
 *     tags: [Kiinteistöt]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Kiinteistö deleted
 */
router.delete('/default/:id', requestLogger, kiinteistotController.deleteKiinteisto);

/**
 * @swagger
 * /api/kiinteistot/default:
 *   post:
 *     summary: Create a new kiinteisto
 *     tags: [Kiinteistöt]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kiinteistotunnus:
 *                 type: string
 *                 example: "123-456-78-9"
 *             required:
 *               - kiinteistotunnus
 *     responses:
 *       201:
 *         description: Kiinteisto created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_kiinteisto:
 *                   type: integer
 *                   example: 101
 *                 kiinteistotunnus:
 *                   type: string
 *                   example: "123-456-78-9"
 *       400:
 *         description: Bad request, error in input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid kiinteistotunnus"
 */
router.post('/default', kiinteistotController.createKiinteisto);

/**
 * @swagger
 * /api/kiinteistot/basic-data:
 *   get:
 *     summary: Get all kiinteistöt with basic data
 *     tags: [Kiinteistöt]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1 
 *         required: false
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 5
 *         required: false
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of kiinteistöt with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                   example: 8
 *                 totalPages:
 *                   type: integer
 *                   example: 2
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_kiinteisto:
 *                         type: integer
 *                         example: 89
 *                       kiinteistotunnus:
 *                         type: string
 *                         example: "854-407-39-3"
 *                       
 */
router.get('/basic-data', kiinteistotController.getAllKiinteistotWithData);

/**
 * @swagger
 * /api/kiinteistot/full/{id}:
 *   get:
 *     summary: Get full data of kiinteistö by ID
 *     tags: [Kiinteistöt]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Full kiinteistö details
 */
router.get('/full/:id', requestLogger, kiinteistotController.getKiinteistoWholeById);
/**
 * @swagger
 * /api/kiinteistot/full/{id}:
 *   put:
 *     summary: Update full kiinteistö data by ID
 *     tags: [Kiinteistöt]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kiinteistö ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_kiinteisto:
 *                 type: integer
 *                 example: 91
 *                 description: Kiinteistö database ID (usually read-only)
 *                 readOnly: true
 *               kiinteistotunnus:
 *                 type: string
 *                 example: "205-2-47-1"
 *                 description: Kiinteistötunnus (property identifier)
 *               rakennukset:
 *                 type: array
 *                 description: List of rakennukset (buildings)
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_rakennus:
 *                       type: integer
 *                       example: 133
 *                       description: Rakennus ID (read-only)
 *                       readOnly: true
 *                     id_kiinteisto:
 *                       type: integer
 *                       example: 91
 *                       description: Foreign key to kiinteistö (read-only)
 *                       readOnly: true
 *                     rakennustunnus:
 *                       type: string
 *                       example: "1018216733"
 *                     osoite:
 *                       type: string
 *                       example: "Lönnrotinkatu 1c"
 *                     toimipaikka:
 *                       type: string
 *                       example: "KAJAANI"
 *                     postinumero:
 *                       type: integer
 *                       example: 87100
 *                     rakennustiedot:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 92
 *                             description: Rakennustiedot ID (read-only)
 *                             readOnly: true
 *                           id_rakennus:
 *                             type: integer
 *                             example: 133
 *                             description: Foreign key to rakennus (read-only)
 *                             readOnly: true
 *                           rakennusvuosi:
 *                             type: string
 *                             example: "1930"
 *                           kokonaisala:
 *                             type: string
 *                             example: "760.00"
 *                           kerrosala:
 *                             type: string
 *                             example: "760.00"
 *                           huoneistoala:
 *                             type: string
 *                             example: "440.00"
 *                           tilavuus:
 *                             type: string
 *                             nullable: true
 *                             example: null
 *                           kerroksia:
 *                             type: integer
 *                             example: 3
 *                           sijainti:
 *                             type: object
 *                             properties:
 *                               type:
 *                                 type: string
 *                                 example: "Point"
 *                               coordinates:
 *                                 type: array
 *                                 items:
 *                                   type: number
 *                                 example: [27.72696699, 64.22165784]
 *                     rakennusluokitukset:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 78
 *                             description: Rakennusluokitus ID (read-only)
 *                             readOnly: true
 *                           rakennus_id:
 *                             type: integer
 *                             example: 133
 *                             description: Foreign key to rakennus (read-only)
 *                             readOnly: true
 *                           rakennusluokitus:
 *                             type: string
 *                             example: "Julkinen rakennus"
 *                           runkotapa:
 *                             type: string
 *                             example: "Paikalla tehty"
 *                           kayttotilanne:
 *                             type: string
 *                             example: "Tyhjillään"
 *                           julkisivumateriaali:
 *                             type: string
 *                             example: "Puu"
 *                           lammitystapa:
 *                             type: string
 *                             example: "Vesikeskuslämmitys"
 *                           lammitysenergialahde:
 *                             type: string
 *                             example: "Kauko- tai aluelämpö"
 *                           rakennusaine:
 *                             type: string
 *                             example: "Betoni"
 *                     metadata:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 51
 *                             description: Metadata ID (read-only)
 *                             readOnly: true
 *                           metadata:
 *                             type: object
 *                             additionalProperties: true
 *                             description: Metadata details with source and editor info
 *                           id_rakennus:
 *                             type: integer
 *                             example: 133
 *                             description: Foreign key to rakennus (read-only)
 *                             readOnly: true
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-07-02T11:57:47.000Z"
 *                             description: Creation timestamp (read-only)
 *                             readOnly: true
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-07-02T11:57:47.000Z"
 *                             description: Update timestamp (read-only)
 *                             readOnly: true
 *     responses:
 *       200:
 *         description: Kiinteistö updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Päivitys onnistui
 *       500:
 *         description: Error updating kiinteistö
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Päivitys epäonnistui
 *                 details:
 *                   type: string
 *                   example: Virhe tietokantakutsussa
 */
router.put('/full/:id', requestLogger, kiinteistotController.updateKiinteistoWholeById);


/**
 * @swagger
 * /full:
 *   post:
 *     summary: Create a new full kiinteistö entry
 *     tags: [Kiinteistöt]
 *     responses:
 *       201:
 *         description: Created full kiinteistö
 */
router.post('/full', kiinteistotController.createKiinteistoWhole);

// router.get('/default', kiinteistotController.getAllKiinteistot);
// router.get('/default/:id', kiinteistotController.getKiinteistoById);
// router.put('/default/:id', requestLogger, kiinteistotController.updateKiinteisto);
// router.delete('/default/:id', requestLogger, kiinteistotController.deleteKiinteisto);
// router.post('/default', kiinteistotController.createKiinteisto);

// router.get('/basic-data', kiinteistotController.getAllKiinteistotWithData);

// router.get('/full/:id', requestLogger, kiinteistotController.getKiinteistoWholeById);
// router.put('/full/:id', requestLogger, kiinteistotController.updateKiinteistoWholeById);

// router.post('/full', kiinteistotController.createKiinteistoWhole);




module.exports = router;
