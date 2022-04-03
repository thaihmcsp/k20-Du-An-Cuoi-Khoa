const router = require("express").Router();
const path = require("path");
const userModel = require("../models/userModel");
const category = require("../models/category");
const productCode = require("../models/productCode");
const { checkUser, checkLogin } = require("../middleWare/checkLogin");
const checkRequire = require("../middleWare/checkRequire");

router.get("/home", checkRequire, (req, res) => {
  res.render("user/home/home", { user: req.user });
});

// Login & Register
router.get("/register", checkUser, (req, res) => {
  res.render("user/signUp/signUp", { user: req.user });
});

router.get("/login", checkUser, (req, res) => {
  res.render("user/signIn/signIn", { user: req.user });
});

// Profile
router.get("/profile/info", checkLogin, (req, res) => {
  res.render("user/profile/info", { user: req.user });
});

router.get("/profile/order", checkLogin, (req, res) => {
  res.render("user/profile/order", { user: req.user });
});

router.get("/profile/info/edit", checkLogin, (req, res) => {
  res.render("user/profile/edit", { user: req.user });
});

router.get("/profile/info/change-password", checkLogin, (req, res) => {
  res.render("user/profile/changePassword", { user: req.user });
});

// Admin
router.get("/admin", function (req, res) {
  res.render("admin/admin");
});

router.get("/admin/productCode", async function (req, res) {
  const listproductCode = await productCode.find();
  const listategory = await category.find();
  res.render("admin/productCode", { listproductCode, listategory });
});

module.exports = router;
