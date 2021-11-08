const express = require("express");
const router = express.Router();

const homeController = require("../app/controllers/HomeController");

//homeController index
router.get("/:idTicket", homeController.index);

router.post("/:idTicket", homeController.validateTxn);

module.exports = router;
