const userModel = require("../models/userModel");

async function checkUser(req, res, next) {
  try {
    if (req.cookies.user) {
      const account = await userModel.findOne({
        token: req.cookies.user,
      });
      if (account) {
        req.id = account._id;
        next();
      } else {
        res.redirect("/login");
      }
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.redirect("/login");
  }
}

async function checkLogin(req, res, next) {
  try {
    if (req.cookies.user) {
      console.log(26);
      const account = await userModel.findOne({
        token: req.cookies.user,
      });
      if (!account) {
        res.redirect("/login");
      } else {
        console.log(32);
        req.id = account._id;
        req.user = account;
        next();
      }
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = { checkUser, checkLogin };
