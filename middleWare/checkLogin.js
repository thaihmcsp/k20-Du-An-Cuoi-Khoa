const userModel = require("../models/userModel");

async function checkUser(req, res, next) {
  try {
    if (req.cookies.user) {
      const account = await userModel.findOne({
        token: req.cookies.user,
      });
      req.id = account._id
      if (account) {
        next();
      } else {
        res.redirect('/login')
      }
    } else {
      res.redirect('/login')
    }
  } catch (error) {
    res.redirect('/login')
  }
  
}

module.exports = { checkUser };
