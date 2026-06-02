const jwt = require("jsonwebtoken");

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
  checkAuth
}