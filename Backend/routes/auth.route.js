
const express = require('express');
const router = express.Router();
const { handleRegister, handleLogin } = require("../controllers/auth.controller");
const upload = require("../utils/multer.utils");
const { rateLimiter } = require("../middlewares/ratelimit.middleware");

router.get('/logout', rateLimiter(1, 10, 'Too many logout requests'), (req, res) => {
  res.cookie("token", "");
  res.json({ success: true });
});
router.post('/register', rateLimiter(60, 3, 'Too many signup attempts'), upload.single('profilePic'), handleRegister);
router.post('/login', rateLimiter(15, 5, 'Too many login attempts'), handleLogin);

module.exports = router;