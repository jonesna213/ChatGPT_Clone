const express = require("express");
const { body } = require("express-validator");

const conversationsController = require("../controllers/conversations");

const router = express.Router();

router.get("/newConversation", conversationsController.newConversation);


module.exports = router;