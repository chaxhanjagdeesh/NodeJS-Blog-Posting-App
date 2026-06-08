const express = require('express');
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");
const commentModel = require("../models/comments.model");

async function handlePost(req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    let { content } = req.body;
    let post = await postModel.create({
        content: content,
        user: user._id,
        postImg: req.file ? req.file.filename : undefined
    });

    user.posts.push(post._id);
    await user.save();
    res.json({
        success: true,
         post: post 
        });
}

async function handleLikeCount(req, res) {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    if (post.likes.includes(req.user.userid) == false) {
        post.likes.push(req.user.userid);
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }
    await post.save();
    res.json({
        success: true,
        likes: post.likes.length
    });
}

async function handleMainLikeCount(req, res) {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    if (post.likes.includes(req.user.userid) == false) {
        post.likes.push(req.user.userid);
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }
    await post.save();
    res.redirect('/');
}

async function handleComment(req, res) {
    let { content } = req.body;
    let comment = await commentModel.create({
        content: content,
        user:  req.user.userid,
        post: req.params.id
    });

    await comment.save();
    res.redirect('/');
}

module.exports = {
    handlePost,
    handleLikeCount,
    handleMainLikeCount,
    handleComment
}