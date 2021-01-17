const express = require('express');
const router = express.Router();
const TeamsController = require('../controllers/TeamsController');
const TeamsParticipatedController = require('../controllers/TeamsParticipatedController');
const authService = require('../services/AuthService');

router.get('/', TeamsController.index);
router.get('/:id', TeamsController.findById);
router.post('/', authService.authorize, TeamsController.store);
router.post('/:team_id/driver/:driver_id', TeamsParticipatedController.store);
router.put('/:id', authService.authorize, TeamsController.update);
router.delete('/:id', authService.authorize, TeamsController.delete);


module.exports = router;