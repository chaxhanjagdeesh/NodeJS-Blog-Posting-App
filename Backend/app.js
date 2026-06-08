const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cookieParser = require('cookie-parser');
const path = require("path");
const cors = require("cors");

const mainRouter = require("./routes/main.route");
const authRouter = require("./routes/auth.route");
const apiRouter = require("./routes/api.route");
const messageRouter = require("./routes/message.route");

const socketHandler = require("./socket/socket");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

socketHandler(io);

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(
    "/images",
    express.static(path.join(process.cwd(), "images"))
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/api", apiRouter);
app.use("/messages", messageRouter);

server.listen(3000);