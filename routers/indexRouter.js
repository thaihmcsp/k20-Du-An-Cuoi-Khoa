const router = require("express").Router();
const path = require("path");
const userModel = require("../models/userModel");
const category = require("../models/category");
const productCode = require("../models/productCode");
const productModel = require("../models/product");
const { checkUser, checkLogin } = require("../middleWare/checkLogin");
const checkRequire = require("../middleWare/checkRequire");

// Home
router.get("/home", checkRequire, async (req, res) => {
  const listcategory = await category.find();
  const listproductCode = await productCode.find().limit(4);
  const countProduct = await productCode.count();
  res.render("user/home/home", {
    user: req.user,
    listcategory,
    listproductCode,
    countProduct,
  });
});

router.get("/pagination", checkRequire, async (req, res) => {
  try {
    let page = 1;
    if (req.query.page) {
      page = req.query.page;
    }
    const listproductCode = await productCode
      .find()
      .skip((page - 1) * 4)
      .limit(4);
    const total = await productCode.count();
    res.render("user/home/pagination", {
      user: req.user,
      listproductCode,
      listPage: Math.ceil(total / 4),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.log(error);
  }
});

// Login & Register
router.get("/register", checkUser, (req, res) => {
  res.render("user/signUp/signUp", { user: req.user });
});

router.get("/login", checkUser, (req, res) => {
  res.render("user/signIn/signIn", { user: req.user });
});

router.get("/admin/login", checkUser, (req, res) => {
  res.render("admin/signIn/signIn", { user: req.user });
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

// Search
router.get("/search", function (req, res) {
  res.render("user/filter/search.ejs");
});

router.post("/search/?size", function (req, res) {
  console.log(req.body);
  productModel
    .create({
      quantity: req.body.quantity,
      size: req.body.size,
      color: req.body.color,
    })
    .then(function (data) {
      res.json({ mess: "ok", data });
    })
    .catch(function (err) {
      res.json({ mess: "thất bại", err });
    });
});

router.get("/cart", checkUser, (req, res) => {
  res.render("user/cart/cart");
});

router.get("/order", checkUser, (req, res) => {
  res.render("user/order/order");
});

router.get("/admin", function (req, res) {
  res.render("admin/admin");
});

router.get("/admin/productCode", async function (req, res) {
  const listproductCode = await productCode.find();
  const listategory = await category.find();
  res.render("admin/productCode", { listproductCode, listategory });
});

router.get("/home", (req, res) => {
  res.render("user/home/home");
});

router.get("/register", checkUser, (req, res) => {
  res.render("user/signUp/signUp");
});

router.get("/login", checkUser, (req, res) => {
  res.render("user/signIn/signIn");
});

router.get("/search", async function (req, res) {
  // console.log(22222222222222,req.headers.referer);

  let dktimkiem = {};
  let dktimkiem1 = { name: { $regex: req.query.search, $options: "i" } };
  console.log(388888, req.query.price);
  if (req.query.pricemax) {
    dktimkiem1.price = {
      $lte: req.query.pricemax * 1,
      $gte: req.query.pricemin * 1,
    };
  }

  if (req.query.color) {
    dktimkiem.color = req.query.color;
  }
  if (req.query.size) {
    dktimkiem.size = req.query.size;
  }
  console.log(388888, dktimkiem1);
  console.log(399999, dktimkiem);
  try {
    const listproduct1 = await productModel.find();
    const listSearch = await productCode
      .find(dktimkiem1)
      .limit(req.query.limit)
      .skip((req.query.page - 1) * req.query.limit);
    const listSearch1 = await productCode.find({
      name: { $regex: req.query.search, $options: "i" },
    });

    // .skip((req.query.page-1)*req.query.limit)
    // const listSearch1 = await productCode.find({name:{$regex:req.query.search,$options:'i'},price : {$gte:req.query.pricemin,$lte:req.query.pricemax}})
    res.render("user/filter/filter", {
      dktimkiem: dktimkiem,
      listproduct: listproduct1,
      min: req.query.pricemin,
      max: req.query.pricemax,
      pagenow: req.query.page,
      ten: req.query.search,
      list: listSearch,
      list123: listSearch1,
    });
  } catch (error) {
    res.status(500).json({ mess: "zz,thất bại", err });
  }
});

router.get("/cart", checkUser, (req, res) => {
  res.render("user/cart/cart");
});

module.exports = router;
