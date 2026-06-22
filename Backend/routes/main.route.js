const express = require('express');
const router = express.Router();
const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const { checkIfLoggedIn,checkAuth } = require("../middlewares/auth.middleware");
const { handleMainPage } = require("../controllers/main.controller");
const { rateLimiter } = require("../middlewares/ratelimit.middleware");

router.get("/", rateLimiter(1, 120, 'Too many requests'), checkIfLoggedIn, handleMainPage);
router.get('/profile', checkAuth, rateLimiter(1, 60, 'Too many profile requests'), async (req, res) => {
  let user = await userModel.findById(req.user.userid).populate('posts');
  res.json({ user });
});

module.exports = router;