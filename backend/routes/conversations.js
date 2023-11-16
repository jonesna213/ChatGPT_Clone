const express = require("express");
const { body } = require("express-validator");

const conversationsController = require("../controllers/conversations");

const router = express.Router();

router.post("newConversation", [
    body("input")
        .trim()
        .not().isEmpty()
], conversationsController.newConversation);


module.exports = router;