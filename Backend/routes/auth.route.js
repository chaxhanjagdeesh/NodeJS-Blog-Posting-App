
const express = require('express');
const router = express.Router();
const { handleRegister, handleLogin } = require("../controllers/auth.controller");
const upload = require("../utils/multer.utils");

router.get('/logout', (req, res) => {
  res.cookie("token", "");
  res.json({ success: true });
});

router.post('/register', upload.single('profilePic'), handleRegister);
router.post('/login', handleLogin);


module.exports = router;