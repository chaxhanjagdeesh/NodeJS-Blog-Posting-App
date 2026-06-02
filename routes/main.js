const express = require('express');
const router = express.Router();
const postModel = require("../models/post");
const userModel = require("../models/user");

router.get("/", async (req, res) => {
    let posts = await postModel.find().populate('user');
    res.render("main", { posts });
});



module.exports = router;