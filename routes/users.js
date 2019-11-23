var express = require('express');
var router = express.Router();
var graphicController = require("../controllers/graphicController");
/* GET users listing. */
/* GET all page. */
router.get('/', function(req, res, next) {
  graphicController.getAll(req,res,next);
});

module.exports = router;
