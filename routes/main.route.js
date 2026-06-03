const express = require('express');
const router = express.Router();
const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const { checkIfLoggedIn } = require("../middlewares/auth.middleware");
const { handleMainPage } = require("../controllers/main.controller");

router.get("/", checkIfLoggedIn, handleMainPage);

module.exports = router;