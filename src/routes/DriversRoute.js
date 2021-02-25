const express = require('express');
const router = express.Router();
const DriversController = require('../controllers/DriversController');
const DriversParticipatedController = require('../controllers/DriversParticipatedController')
const authService = require('../services/AuthService');

router.get('/', DriversController.index);
router.get('/:id', DriversController.findById);
router.get('/:id/wins/', DriversController.findWins);
router.get('/:id/races', DriversController.findLatestsRaces);
router.get('/:id/penalty', DriversController.findPenalty);
router.post('/', authService.authorize, DriversController.store);
router.post('/:driver_id/team/:team_id/season/:season_id', authService.authorize,DriversParticipatedController.store);
router.put('/:id', authService.authorize, DriversController.update);
router.patch('/:id', authService.authorize, DriversController.updatePenalty);


module.exports = router;