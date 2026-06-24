const express = require("express");
const router = express.Router();
const { handleMessagePage, handleInboxPage } = require("../controllers/message.controller");
const { checkIfLoggedIn} = require("../middlewares/auth.middleware");
const { rateLimiter } = require("../middlewares/ratelimit.middleware");

router.get("/", rateLimiter('message:inbox:view', 120, 60), checkIfLoggedIn, handleInboxPage);
router.get("/:id", checkIfLoggedIn, rateLimiter('message:chat:view', 120, 60), handleMessagePage);

module.exports = router;
