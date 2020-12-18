const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

router.post('/', UsersController.store);

module.exports = router;