const router = require("express").Router();
const path = require("path");
const userModel = require("../models/userModel");
const { checkUser } = require("../middleWare/checkLogin");

router.get("/home", (req, res) => {
  res.render("user/home/home");
});

router.get("/register", checkUser, (req, res) => {
  res.render("user/signUp/signUp");
});

router.get("/login", checkUser, (req, res) => {
  res.render("user/signIn/signIn");
});

module.exports = router;
