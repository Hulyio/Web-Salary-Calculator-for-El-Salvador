var express = require('express');
var router = express.Router();
var graphicController = require("../controllers/graphicController");

/* GET form page. */
router.get('/salarioform', function(req, res, next) {
  res.render('newsalarioform', { title: 'Express' });
});

/* GET all page. */
router.get('/', function(req, res, next) {
  graphicController.getAll(req,res,next);
});

/* GET one page. */
router.get('/:username', function(req, res, next) {
  graphicController.getOne(req,res,next);
});

//post one 

router.post("/", graphicController.register);

module.exports = router;