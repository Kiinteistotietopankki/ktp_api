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
 *     summary: Update partial or full kiinteistö data by ID
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
 *             description: >
 *               Partial or full kiinteistö update data. 
 *               All fields are optional — send only fields to update.
 *             additionalProperties: false
 *             properties:
 *               kiinteistotunnus:
 *                 type: string
 *                 example: "244-401-117-125"
 *                 description: Kiinteistötunnus (property identifier)
 *               rakennukset:
 *                 type: array
 *                 description: List of rakennukset (buildings) to update
 *                 items:
 *                   type: object
 *                   description: Partial rakennus data — send only fields to update
 *                   additionalProperties: false
 *                   properties:
 *                     id_rakennus:
 *                       type: integer
 *                       example: 132
 *                       description: Rakennus ID (required to identify which rakennus to update)
 *                     rakennustunnus:
 *                       type: string
 *                       example: "100561859X"
 *                     osoite:
 *                       type: string
 *                       example: "Katintie 9"
 *                     toimipaikka:
 *                       type: string
 *                       example: "KEMPELE"
 *                     postinumero:
 *                       type: integer
 *                       example: 90440
 *                     rakennustiedot:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Partial rakennustiedot data — send only fields to update
 *                         additionalProperties: false
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 91
 *                             description: Rakennustiedot ID (required to identify record)
 *                           rakennusvuosi:
 *                             type: string
 *                             example: "1969"
 *                           kerrosala:
 *                             type: string
 *                             example: "120.00"
 *                           huoneistoala:
 *                             type: string
 *                             example: "120.00"
 *                           kerroksia:
 *                             type: integer
 *                             example: 1
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
 *                                 example: [25.52603082, 64.91089078]
 *                     rakennusluokitukset:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Partial rakennusluokitukset data — send only fields to update
 *                         additionalProperties: false
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 77
 *                             description: Rakennusluokitus ID (required to identify record)
 *                           rakennusluokitus:
 *                             type: string
 *                             example: "Pientalo"
 *                           runkotapa:
 *                             type: string
 *                             example: "Paikalla tehty"
 *                           kayttotilanne:
 *                             type: string
 *                             example: "Käytetään vakinaiseen asumiseen"
 *                           julkisivumateriaali:
 *                             type: string
 *                             example: "Tiili"
 *                           lammitystapa:
 *                             type: string
 *                             example: "Vesikeskuslämmitys"
 *                           lammitysenergialahde:
 *                             type: string
 *                             example: "Kevyt polttoöljy"
 *                           rakennusaine:
 *                             type: string
 *                             example: "Puu"
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
