const router = require("express").Router();
const Category = require("../models/category");
const ProductCodeModel = require("../models/productCode");
const ProductModel = require("../models/product");
const UserModel = require("../models/userModel");
const { checkUser } = require("../middleWare/checkLogin");

router.get("/", function (req, res) {
  res.render("user/home/home.ejs");
});

router.get("/admin", function (req, res) {
  res.render("admin/admin");
});

router.get("/admin/productCode", async function (req, res) {
  const listproductCode = await ProductCodeModel.find();
  const listategory = await Category.find();
  res.render("admin/productCode", { listproductCode, listategory });
});

router.get("/home", (req, res) => {
  res.render("user/home/home");
});

router.get("/register", (req, res) => {
  res.render("user/signUp/signUp");
});

router.get("/login", checkUser, (req, res) => {
  res.render("user/signIn/signIn");
});

router.get("/search", async function (req, res) {
  console.log(22222222222222,req.url);

  let dktimkiem = {};
  let dktimkiem1 = { name: { $regex: req.query.search, $options: "i" } };
  
  if (req.query.pricemax) {
    dktimkiem1.price = {
      $lte: req.query.pricemax * 1,
      $gte: req.query.pricemin * 1,
    };
  }
  if (req.query.color) {
    dktimkiem.color = [req.query.color];
  }
  if (req.query.size) {
    dktimkiem.size = req.query.size;
  }
    try {
    const listproduct1 = await ProductModel.find();
    const listSearchNoLimit = await ProductCodeModel.find(dktimkiem1)
    const listSearch = await ProductCodeModel.find(dktimkiem1)
      .limit(req.query.limit)
      .skip((req.query.page - 1) * req.query.limit);
    const listSearch1 = await ProductCodeModel.find({
      name: { $regex: req.query.search, $options: "i" },
    });
    res.render("user/filter/filter", {
      dktimkiem: dktimkiem,
      listproduct: listproduct1,
      min: req.query.pricemin,
      max: req.query.pricemax,
      url:req.url,
      pagenow: req.query.page,
      ten: req.query.search,
      list: listSearch,
      listNoLimit: listSearchNoLimit,
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
