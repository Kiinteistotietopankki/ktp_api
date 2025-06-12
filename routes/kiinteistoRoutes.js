const express = require('express');
const router = express.Router();
const kiinteistotController = require('../controllers/kiinteistoController');
const authMiddleware = require('../middlewares/authMiddleware');
const apikeyMiddleware = require('../middlewares/checkApikey')

// router.use(authMiddleware);
router.use(apikeyMiddleware);

router.get('/', kiinteistotController.getAllKiinteistot);
router.get('/withdata', kiinteistotController.getAllKiinteistotWithData);
router.get('/full/:id', kiinteistotController.getKiinteistoWholeById);
router.get('/:id', kiinteistotController.getKiinteistoById);
router.post('/', kiinteistotController.createKiinteisto);
router.post('/create', kiinteistotController.createKiinteistoWhole);
router.put('/:id', kiinteistotController.updateKiinteisto);
router.delete('/:id', kiinteistotController.deleteKiinteisto);

module.exports = router;
