
const express = require('express');
const router = express.Router();
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");
const { checkAuth } = require("../middlewares/auth.middleware");
const { handlePost, handlePostDelete, handleLikeCount, handleMainLikeCount, handleComment, handleCommentDelete } = require("../controllers/post.controller");
const upload = require("../utils/multer.utils");


router.post('/post', checkAuth, upload.single('postImg'), handlePost);
router.delete('/post/:id', checkAuth, handlePostDelete);
router.post('/comment/:id', checkAuth, handleComment);
router.delete('/comment/:id', checkAuth, handleCommentDelete);
router.get('/like/:id', checkAuth, handleLikeCount);
router.get('/likemain/:id', checkAuth, handleMainLikeCount);

module.exports = router;