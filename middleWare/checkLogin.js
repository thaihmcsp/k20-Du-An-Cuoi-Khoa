const userModel = require("../models/userModel");

async function checkUser(req, res, next) {
  try {
    if (req.cookies.user) {
      const account = await userModel.findOne({
        token: req.cookies.user,
      });
      req.id = account._id
      if (account) {
        res.redirect("/home");
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = { checkUser };
