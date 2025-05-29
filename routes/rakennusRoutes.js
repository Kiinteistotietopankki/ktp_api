const express = require('express');
const router = express.Router();
const rakennuksetController = require('../controllers/rakennusController');
const authMiddleware = require('../middlewares/authMiddleware');
const apikeyMiddleware = require('../middlewares/checkApikey');

// router.use(authMiddleware);
router.use(apikeyMiddleware);

router.get('/', rakennuksetController.getAllRakennukset);
router.get('/:id', rakennuksetController.getRakennusById);
router.post('/', rakennuksetController.createRakennus);
router.put('/:id', rakennuksetController.updateRakennus);
router.delete('/:id', rakennuksetController.deleteRakennus);

module.exports = router;
