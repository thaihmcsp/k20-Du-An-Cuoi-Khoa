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

router.get("/login", (req, res) => {
  res.render("user/signIn/signIn");
});

router.get("/cart",checkUser, (req, res) => {
  res.render("user/cart/cart");
});
router.get("/order",checkUser, (req, res) => {
  res.render("user/order/order");
});

module.exports = router;
