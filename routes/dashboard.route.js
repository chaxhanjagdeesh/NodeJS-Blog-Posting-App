
const express = require('express');
const router = express.Router();
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");
const { checkAuth } = require("../middlewares/auth.middleware");
const { handlePost, handleLikeCount } = require("../controllers/post.controller");

router.get('/profile', checkAuth, async (req, res) => {
    let user = await userModel.findById(req.user.userid).populate('posts');
    res.render("profile", { user })
});

router.post('/post', checkAuth, handlePost);
router.get('/like/:id', checkAuth, handleLikeCount);

module.exports = router;