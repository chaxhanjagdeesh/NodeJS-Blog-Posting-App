const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mainRouter = require("./routes/main.route");
const authRouter = require("./routes/auth.route");
const dashboardRouter = require("./routes/dashboard.route");

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});