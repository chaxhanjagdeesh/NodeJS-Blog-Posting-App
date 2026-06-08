const express = require('express');
const router = express.Router();
const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const { checkIfLoggedIn,checkAuth } = require("../middlewares/auth.middleware");
const { handleMainPage } = require("../controllers/main.controller");

router.get("/", checkIfLoggedIn, handleMainPage);
router.get('/profile', checkAuth, async (req, res) => {
    let user = await userModel.findById(req.user.userid).populate('posts');
    res.json({ user });
});

module.exports = router;