const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cookieParser = require('cookie-parser');
const path = require("path");
const mainRouter = require("./routes/main.route");
const authRouter = require("./routes/auth.route");
const dashboardRouter = require("./routes/dashboard.route");
const messageRouter = require("./routes/message.route");
const socketHandler = require("./socket/socket");
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

socketHandler(io);

app.set('view engine', 'ejs');
app.use(
    "/images",
    (req, res, next) => {
        res.setHeader("ngrok-skip-browser-warning", "true");
        next();
    },
    express.static(path.join(process.cwd(), "images"))
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);
app.use("/messages", messageRouter);
server.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});