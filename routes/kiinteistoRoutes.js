const express = require('express');
const router = express.Router();
const kiinteistotController = require('../controllers/kiinteistoController');
const authMiddleware = require('../middlewares/authMiddleware');
const apikeyMiddleware = require('../middlewares/checkApikey')
const requestLogger = require('../middlewares/loggerMiddleware')

// router.use(authMiddleware);
router.use(apikeyMiddleware);

router.get('/default', kiinteistotController.getAllKiinteistot);
router.get('/default/:id', kiinteistotController.getKiinteistoById);
router.put('/default/:id', requestLogger, kiinteistotController.updateKiinteisto);
router.delete('/default/:id', requestLogger, kiinteistotController.deleteKiinteisto);
router.post('/default', kiinteistotController.createKiinteisto);

router.get('/basic-data', kiinteistotController.getAllKiinteistotWithData);

router.get('/full/:id', requestLogger, kiinteistotController.getKiinteistoWholeById);
router.post('/full', kiinteistotController.createKiinteistoWhole);




module.exports = router;
