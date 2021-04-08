const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/PostsController');
const authService = require('../services/AuthService');

router.get('/', PostsController.index);
router.post('/', PostsController.store);

module.exports = router;