const jwt = require("jsonwebtoken");

function checkIfLoggedIn(req, res, next) {
  if (req.cookies.token == "") {
    req.user = null;
    next();
  } else {
    jwt.verify(req.cookies.token, "shhhh", (err, decoded) => {
      if (err) {
        req.user = null;
        next();
      } else {
        req.user = decoded;
        next();
      }
    })
  }
}

function checkAuth(req, res, next) {
  if (req.cookies.token == "") {
    res.status(401).json({ success: false, message: "Not authenticated" });
  } else {
    jwt.verify(req.cookies.token, "shhhh", (err, decoded) => {
      if (err) {
        res.status(401).json({ success: false, message: "Invalid token" });
      } else {
        req.user = decoded;
        next();
      }
    })
  }
}

module.exports = {
  checkAuth,
  checkIfLoggedIn
}