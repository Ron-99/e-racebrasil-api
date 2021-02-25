const express = require('express');
const router = express.Router();
const ClassificationsController = require('../controllers/ClassificationsController');
const authService = require('../services/AuthService');

router.get('/', ClassificationsController.index);
// router.get('/:id', ClassificationsController.findById);
router.get('/dates', ClassificationsController.findDatesByRank);
router.get('/drivers-points', ClassificationsController.findDriversPoints);
router.get('/teams-points', ClassificationsController.findTeamsPoints);
router.post('/', authService.authorize, ClassificationsController.store);
router.put('/:id', authService.authorize, ClassificationsController.update);
router.delete('/:id', authService.authorize, ClassificationsController.delete);

module.exports = router;