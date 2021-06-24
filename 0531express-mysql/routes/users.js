var express = require('express');
var router = express.Router();
var User = require('../controllers/UserController.js');
/* GET users listing. */
router.post('/sendcode',User.sendcode );
router.post('/codePhoneLogin',User.codePhoneLogin);
module.exports = router;
