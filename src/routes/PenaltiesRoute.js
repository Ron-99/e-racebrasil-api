const express = require('express');
const router = express.Router();
const PenaltiesController = require('../controllers/PenaltiesController');
const authService = require('../services/AuthService');

router.get('/', PenaltiesController.index);
router.post('/', authService.authorize, PenaltiesController.store);
router.put('/:id', authService.authorize, PenaltiesController.update);

module.exports = router;