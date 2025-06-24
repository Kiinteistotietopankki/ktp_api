const express = require('express');
const router = express.Router();
const kiinteistotController = require('../controllers/kiinteistoController');
const authMiddleware = require('../middlewares/authMiddleware');
const apikeyMiddleware = require('../middlewares/checkApikey')
const requestLogger = require('../middlewares/loggerMiddleware')

// router.use(authMiddleware);
router.use(apikeyMiddleware);

router.get('/default', requestLogger, kiinteistotController.getAllKiinteistot);
router.get('/default/:id', requestLogger, kiinteistotController.getKiinteistoById);
router.put('/default/:id', requestLogger, kiinteistotController.updateKiinteisto);
router.delete('/default/:id', requestLogger, kiinteistotController.deleteKiinteisto);
router.post('/default', requestLogger, kiinteistotController.createKiinteisto);

router.get('/basic-data', requestLogger, kiinteistotController.getAllKiinteistotWithData);

router.get('/full/:id', requestLogger, kiinteistotController.getKiinteistoWholeById);
router.post('/full', requestLogger, kiinteistotController.createKiinteistoWhole);




module.exports = router;
