const express = require("express");

const conversationsController = require("../controllers/conversations");

const router = express.Router();

router.post("/chat", conversationsController.chat);


module.exports = router;