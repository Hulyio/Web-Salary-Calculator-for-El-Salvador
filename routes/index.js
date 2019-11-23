var express = require('express');
var router = express.Router();
var graphicController = require("../controllers/graphicController");

/* UPDATE one page. */
router.get('/update/:username', function(req, res, next) {
  graphicController.update(req,res,next);
});

/* GET form page. */
router.get('/salarioform', function(req, res, next) {
  res.render('newform', { title: 'Express' });
});

/* UPDATE one page. part2 */
router.post('/myupdate/:_id', function(req, res, next) {
  graphicController.update2(req,res,next);
});

/* DELETE one page. */
router.get('/delete/:username', function(req, res, next) {
  graphicController.delete(req,res,next);
});

/* GET all page. */
router.get('/', function(req, res, next) {
  graphicController.getAll(req,res,next);
});

/* GET one page. */
router.get('/:username', function(req, res, next) {
  graphicController.getOne(req,res,next);
});

router.post("/", graphicController.register);

module.exports = router;