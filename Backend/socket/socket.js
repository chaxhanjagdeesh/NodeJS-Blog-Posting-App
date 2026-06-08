const messageModel = require("../models/message.model");

function socketHandler(io) {
    io.on("connection", (socket) => {
        console.log("User Connected");
        socket.on("join-room", (roomId) => {
            socket.join(roomId);
            console.log("Joined Room:", roomId);
        });

        socket.on("send-message", async (data) => {
            const message = await messageModel.create({
                sender: data.sender,
                receiver: data.receiver,
                text: data.text
            });
            const roomId = [data.sender, data.receiver]
                .sort()
                .join("_");
            io.to(roomId).emit("receive-message", {
                sender: data.sender,
                receiver: data.receiver,
                text: data.text
            });
        });

        socket.on("disconnect", () => {
            console.log("User Disconnected");
        });
    });
}

module.exports = socketHandler;
