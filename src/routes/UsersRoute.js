const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const authService = require('../services/AuthService');

router.get('/', authService.authorize, UsersController.index);
router.post('/', UsersController.store);
router.post('/login', UsersController.authenticate);
router.post('/refresh-token', authService.authorize, UsersController.refreshToken)
router.put('/:id', authService.authorize,UsersController.update);

module.exports = router;