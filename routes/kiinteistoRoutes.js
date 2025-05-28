const express = require('express');
const router = express.Router();
const kiinteistotController = require('../controllers/kiinteistoController');

router.get('/', kiinteistotController.getAllKiinteistot);
router.get('/:id', kiinteistotController.getKiinteistoById);
router.post('/', kiinteistotController.createKiinteisto);
router.put('/:id', kiinteistotController.updateKiinteisto);
router.delete('/:id', kiinteistotController.deleteKiinteisto);

module.exports = router;
