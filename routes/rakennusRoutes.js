const express = require('express');
const router = express.Router();
const rakennuksetController = require('../controllers/rakennusController');

// router.use(authMiddleware);


router.get('/', rakennuksetController.getAllRakennukset);
router.get('/:id', rakennuksetController.getRakennusById);
router.post('/', rakennuksetController.createRakennus);
router.put('/:id', rakennuksetController.updateRakennus);
router.delete('/:id', rakennuksetController.deleteRakennus);

module.exports = router;
