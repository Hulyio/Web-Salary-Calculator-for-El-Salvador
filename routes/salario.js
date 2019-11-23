var express = require('express');
var router = express.Router();

var salarioController = require("../controllers/salarioController");

router.get("/:username", salarioController.getOne);
router.get("/", salarioController.getAll);
router.post("/", salarioController.register);
router.put("/:username", salarioController.update);
router.delete("/:username", salarioController.delete);

module.exports = router;