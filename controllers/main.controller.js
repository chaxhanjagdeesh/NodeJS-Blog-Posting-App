const express = require('express');
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");

async function handleMainPage(req, res) {
    let page = parseInt(req.query.page) || 1;
    let sort = req.query.sort || "newest";
    let limit = 5;
    let skip = (page - 1) * limit;

    if (req.user) {
        let posts = await postModel.find({ user: { $ne: req.user.userid } }).populate('user').sort({ date: sort === "newest" ? -1 : 1 }).skip(skip).limit(limit);
        let user = await userModel.findById(req.user.userid);
        res.render("main", { posts, page, limit, sort, user });
    } else {
        let posts = await postModel.find().populate('user').sort({ date: sort === "newest" ? -1 : 1 }).skip(skip).limit(limit);
        res.render("main", { posts, page, limit, sort, user: null });
    }
}
module.exports = {
    handleMainPage
}