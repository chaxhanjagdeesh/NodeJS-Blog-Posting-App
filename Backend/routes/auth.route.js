
const express = require('express');
const router = express.Router();
const { handleRegister, handleLogin } = require("../controllers/auth.controller");
const upload = require("../utils/multer.utils");
const { rateLimiter } = require("../middlewares/ratelimit.middleware");

router.get('/logout', rateLimiter('auth:logout', 10, 60), (req, res) => {
  res.cookie("token", "");
  res.json({ success: true });
});
router.post('/register', rateLimiter('auth:register', 3, 3600), upload.single('profilePic'), handleRegister);
router.post('/login', rateLimiter('auth:login', 5, 900), handleLogin);

module.exports = router;