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
    res.redirect('/auth/login');
  } else {
    jwt.verify(req.cookies.token, "shhhh", (err, decoded) => {
      if (err) res.send("Invalid token");
      req.user = decoded;
      next();
    })
  }
}

module.exports = {
  checkAuth,
  checkIfLoggedIn
}