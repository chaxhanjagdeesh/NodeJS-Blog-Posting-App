const userModel = require("../models/user.model");
const messageModel = require("../models/message.model");

async function handleInboxPage(req, res) {
    const myId = req.user.userid;
    const messages = await messageModel.find({
        $or: [
            { sender: myId },
            { receiver: myId }
        ]
    })
    .populate("sender")
    .populate("receiver");
    const chattedUsers = [];
    messages.forEach(message => {
        const otherUser =
            message.sender._id.toString() === myId
                ? message.receiver
                : message.sender;
        const alreadyExists = chattedUsers.find(
            user => user._id.toString() === otherUser._id.toString()
        );
        if (!alreadyExists) {
            chattedUsers.push(otherUser);
        }
    });
    res.json({
        users: chattedUsers
    });
}

async function handleMessagePage(req, res) {
    const receiver = await userModel.findById(req.params.id);
    const messages = await messageModel.find({
        $or: [
            {
                sender: req.user.userid,
                receiver: req.params.id
            },
            {
                sender: req.params.id,
                receiver: req.user.userid
            }
        ]
    }).populate("sender");

    res.json({
        receiver:receiver,
        messages:messages,
        currentUser: req.user
    });
}

module.exports = {
    handleInboxPage,
    handleMessagePage
};
