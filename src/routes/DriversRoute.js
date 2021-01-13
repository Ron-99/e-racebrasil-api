const express = require('express');
const router = express.Router();
const DriversController = require('../controllers/DriversController');
const authService = require('../services/AuthService');

router.get('/', DriversController.index);
router.get('/:id', DriversController.findBydId);
router.post('/', authService.authorize, DriversController.store);
router.put('/:id', authService.authorize, DriversController.update);
router.patch('/:id', authService.authorize, DriversController.updatePenalty);


module.exports = router;