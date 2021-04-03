const express = require('express');
const router = express.Router();
const TempTeamsController = require('../controllers/TempTeamsController');

router.get('/', TempTeamsController.findAll);
router.post('/', TempTeamsController.store);

module.exports = router;