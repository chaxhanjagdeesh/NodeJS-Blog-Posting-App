
const express = require('express');
const router = express.Router();
const { handleRegister, handleLogin } = require("../controllers/auth.controller");
const upload = require("../utils/multer.utils");

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/logout', (req, res) => {
  res.cookie("token", "");
  res.redirect("/auth/login");
});

router.post('/register', upload.single('profilePic'), handleRegister);
router.post('/login', handleLogin);


module.exports = router;