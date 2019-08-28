var express = require('express');
var controller = require('../controllers/videoController');
var router = express.Router();
var authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, controller.validate('createVideo'), controller.post);

module.exports = router;