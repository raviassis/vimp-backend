var express = require('express');
var controller = require('../controllers/authController');
var router = express.Router();

router.post('/login', controller.login);

module.exports = router;