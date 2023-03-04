const jwt = require("jsonwebtoken");
const SECRET = require("../constant/secret");

function adminGuard(req, res, next) {
  const token = req.session.auth;

  console.log("[1]");
  if (!token) {
    res.redirect("/user/login");
    return;
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    const user = decoded._doc;
    if (!user.isAdmin) {
      console.log("[2]");
      // res.redirect("/?message=You are not admin!");
      res.render("unauthorized");
      return;
    }

    if (err) {
      console.log("[3]");
      res.redirect("/user/login");
    } else {
      next();
    }
  });
}

module.exports = adminGuard;
