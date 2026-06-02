
const express = require('express');
const router = express.Router();
const userModel = require("../models/user");
const postModel = require("../models/post");
const { checkAuth } = require("../middlewares/auth");
const { handlePost, handleLikeCount } = require("../controllers/post");

router.get('/profile', checkAuth, async (req, res) => {
    let user = await userModel.findById(req.user.userid).populate('posts');
    res.render("profile", { user })
});

router.post('/post', checkAuth, handlePost);
router.get('/like/:id', checkAuth, handleLikeCount);

module.exports = router;