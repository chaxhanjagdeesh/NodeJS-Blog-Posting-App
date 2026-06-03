const express = require('express');
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");

async function handlePost(req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    let { content } = req.body;
    let post = await postModel.create({
        content: content,
        user: user._id
    });

    user.posts.push(post._id);
    await user.save();
    res.redirect('/dashboard/profile');
}

async function handleLikeCount(req, res) {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    if (post.likes.includes(req.user.userid) == false) {
        post.likes.push(req.user.userid);
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }
    await post.save();
    res.redirect('/dashboard/profile');
}

module.exports = {
    handlePost,
    handleLikeCount
}