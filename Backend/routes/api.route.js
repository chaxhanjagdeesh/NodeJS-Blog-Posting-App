
const express = require('express');
const router = express.Router();
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");
const { checkAuth } = require("../middlewares/auth.middleware");
const { handlePost, handlePostDelete, handleLikeCount, handleMainLikeCount, handleComment, handleCommentDelete } = require("../controllers/post.controller");
const upload = require("../utils/multer.utils");
const { rateLimiter } = require("../middlewares/ratelimit.middleware");

router.post('/post', checkAuth, rateLimiter(5, 10, 'Too many posts created'), upload.single('postImg'), handlePost);
router.delete('/post/:id', checkAuth, rateLimiter(1, 30, 'Too many delete requests'), handlePostDelete);
router.post('/comment/:id', checkAuth, rateLimiter(1, 20, 'Too many comments'), handleComment);
router.delete('/comment/:id', checkAuth, rateLimiter(1, 50, 'Too many delete requests'), handleCommentDelete);
router.get('/like/:id', checkAuth, rateLimiter(1, 100, 'Too many likes'), handleLikeCount);
router.get('/likemain/:id', checkAuth, rateLimiter(1, 100, 'Too many likes'), handleMainLikeCount);

module.exports = router;