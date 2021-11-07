const express = require("express");
const router = express.Router();

const documentController = require("../app/controllers/DocumentController");

//homeController index
router.get("/", documentController.index);

module.exports = router;
