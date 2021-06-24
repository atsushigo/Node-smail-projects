var express = require('express');
var router = express.Router();
var category = require('../controllers/CategoryController.js')
/* GET home page. */
router.get('/',  category.getCategory)
router.get('/getPostCate',category.getPostCate)
module.exports = router;
