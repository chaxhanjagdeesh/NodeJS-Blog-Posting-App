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

    const posts = await postModel.aggregate([
        { $match: query },
        { $sort: { date: sort === "newest" ? -1 : 1 } },
        { $skip: skip },
        { $limit: limit },

        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" },

        {
            $lookup: {
                from: "comments",
                let: { postId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$post", "$$postId"] }
                        }
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "user",
                            foreignField: "_id",
                            as: "user"
                        }
                    },
                    { $unwind: "$user" }
                ],
                as: "comments"
            }
        }
    ]);


    // posts = postsWithComments;
    let user = null;
    if (req.user) {
        user = await userModel.findById(req.user.userid);
    }
    res.json({
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
