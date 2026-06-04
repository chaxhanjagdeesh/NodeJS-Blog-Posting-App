const express = require('express');
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");
const commentModel = require("../models/comments.model");

async function handleMainPage(req, res) {

    let page = parseInt(req.query.page) || 1;
    let sort = req.query.sort || "newest";
    let limit = 5;
    let skip = (page - 1) * limit;
    let query = {};
    if (req.user) {
        query = {
            user: { $ne: req.user.userid }
        };
    }
    let posts = await postModel.find(query)
        .populate("user")
        .sort({ date: sort === "newest" ? -1 : 1 })
        .skip(skip)
        .limit(limit);

    const postsWithComments = await Promise.all(
        posts.map(async (post) => {
            const postObj = post.toObject();
            postObj.comments = await commentModel.find({
                post: post._id
            }).populate("user");
            return postObj;
        })
    );
    posts = postsWithComments;
    let user = null;
    if (req.user) {
        user = await userModel.findById(req.user.userid);
    }
    res.render("main", {
        posts,
        page,
        limit,
        sort,
        user
    });
}

module.exports = {
    handleMainPage
};
