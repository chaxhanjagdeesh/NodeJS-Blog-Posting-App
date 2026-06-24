
const express = require('express');
const router = express.Router();
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");
const { checkAuth } = require("../middlewares/auth.middleware");
const { handlePost, handlePostDelete, handleLikeCount, handleMainLikeCount, handleComment, handleCommentDelete } = require("../controllers/post.controller");
const upload = require("../utils/multer.utils");
const { rateLimiter } = require("../middlewares/ratelimit.middleware");

router.post('/post', checkAuth, rateLimiter('post:create', 10, 300), upload.single('postImg'), handlePost);
router.delete('/post/:id', checkAuth, rateLimiter('post:delete', 30, 60), handlePostDelete);
router.post('/comment/:id', checkAuth, rateLimiter('comment:create', 20, 60), handleComment);
router.delete('/comment/:id', checkAuth, rateLimiter('comment:delete', 50, 60), handleCommentDelete);
router.post('/like/:id', checkAuth, rateLimiter('post:like', 100, 60), handleLikeCount);
router.post('/likemain/:id', checkAuth, rateLimiter('mainpost:like', 100, 60), handleMainLikeCount);

module.exports = router;