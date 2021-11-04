const express = require("express");
const router = express.Router();

const ErrorController = require("../app/controllers/ErrorController");

//homeController index
router.get("/", ErrorController.index);

module.exports = router;
