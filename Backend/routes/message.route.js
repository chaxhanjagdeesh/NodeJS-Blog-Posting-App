const express = require("express");
const router = express.Router();
const { handleMessagePage, handleInboxPage } = require("../controllers/message.controller");
const { checkIfLoggedIn} = require("../middlewares/auth.middleware");

router.get("/", checkIfLoggedIn, handleInboxPage);
router.get("/:id", checkIfLoggedIn, handleMessagePage);

module.exports = router;
