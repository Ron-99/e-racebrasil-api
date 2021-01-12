const express = require('express');
const router = express.Router();
const TracksController = require('../controllers/TracksController');
const authService = require('../services/AuthService');

router.get('/', TracksController.index);
router.post('/', authService.authorize, TracksController.store);
router.put('/:id', authService.authorize, TracksController.update);

module.exports = router;