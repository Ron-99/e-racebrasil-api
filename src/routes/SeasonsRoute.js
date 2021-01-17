const express = require('express');
const router = express.Router();
const SeasonsController = require('../controllers/SeasonsController');
const authService = require('../services/AuthService');

router.get('/', SeasonsController.index);
router.get('/:id', SeasonsController.findById);
router.post('/', authService.authorize, SeasonsController.store);
router.put('/:id', authService.authorize, SeasonsController.update);
router.delete('/:id', authService.authorize, SeasonsController.delete);

module.exports = router;