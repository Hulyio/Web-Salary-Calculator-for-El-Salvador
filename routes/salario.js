var express = require('express');
var router = express.Router();

/* GET ALL SALARIOS. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

var salarioController = require("../controllers/salarioController");

/* GET ALL SALARIOS. 
router.get('/', function(req, res, next) {
  res.render('salario', { title: 'Express' });
});*/

router.get("/:username", salarioController.getOne);
router.get("/", salarioController.getAll);
router.post("/", salarioController.register);
router.put("/:username", salarioController.update);
router.delete("/:username", salarioController.delete);

module.exports = router;