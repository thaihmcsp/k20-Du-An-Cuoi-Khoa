const userModel = require("../models/userModel");

async function isNotRequire(req, res, next) {
  try {
    const account = await userModel.findOne({
      token: req.cookies.user,
    });
    req.user = account;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = isNotRequire;
