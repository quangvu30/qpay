const express = require("express");
const router = express.Router();

const LandingController = require("../app/controllers/LandingController");

//homeController index
router.get("/", LandingController.index);

module.exports = router;
