const express = require("express");
const router = express.Router();
const { handleMessagePage, handleInboxPage } = require("../controllers/message.controller");
const { checkIfLoggedIn} = require("../middlewares/auth.middleware");
const { rateLimiter } = require("../middlewares/ratelimit.middleware");

router.get("/", rateLimiter(1, 120, 'Too many requests'), checkIfLoggedIn, handleInboxPage);
router.get("/:id", checkIfLoggedIn, rateLimiter(1, 120, 'Too many requests'), handleMessagePage);

module.exports = router;
