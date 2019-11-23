var express = require('express');
var router = express.Router();

/* GET form page. */
router.get('/', function(req, res, next) {
    res.render('newsalarioform', { title: 'Express' });
  });

  module.exports = router;