const express = require('express');
const router = express.Router();
const RanksController = require('../controllers/RanksController');
const authService = require('../services/AuthService');

router.get('/', RanksController.index);
router.get('/:id', RanksController.findById);
router.post('/', authService.authorize, RanksController.store);
router.put('/:id', authService.authorize, RanksController.update);
router.delete('/:id', authService.authorize, RanksController.delete);

module.exports = router;