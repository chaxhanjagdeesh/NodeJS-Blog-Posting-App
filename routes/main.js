const express = require('express');
const router = express.Router();
const postModel = require("../models/post");
const userModel = require("../models/user");

router.get("/", async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let sort = req.query.sort || "newest";
    let limit = 5;
    let skip = (page - 1) * limit;
    let posts = await postModel.find().populate('user').sort({date: sort === "newest" ? -1 : 1}).skip(skip).limit(limit);
    res.render("main", { posts, page, limit, sort });
});



module.exports = router;