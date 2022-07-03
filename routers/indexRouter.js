const router = require("express").Router();
const path = require("path");
const userModel = require("../models/userModel");
const category = require("../models/category");
const productCode = require("../models/productCode");
const productModel = require("../models/product");
const orderModel = require("../models/orderModel");
const { checkUser, checkLogin } = require("../middleWare/checkLogin");
const checkAdmin = require("../middleWare/checkAdmin");
const checkRequire = require("../middleWare/checkRequire");

// Home
router.get("/", checkRequire, async (req, res) => {
  const listcategory = await category.find();
  let listproductCode = await productCode
    .find()
    .sort({ createdAt: -1 })
    .limit(12);
  const listProduct = await productModel.find();
  const countProduct = await productCode.count();

  const listCode = listProduct.filter(function (product, index) {
    return (
      index ===
      listProduct.findIndex((value) => {
        return value.productCode === product.productCode;
      })
    );
  });

  listproductCode = listproductCode.map((product, i) => {
    for (let j = 0; j < listCode.length; j++) {
      if (listCode[j].productCode == product._id) {
        const newProduct = { ...product._doc };
        newProduct.hasData = true;
        return newProduct;
      }
    }
    return product;
  });

  res.render("user/home/home", {
    user: req.user,
    listcategory,
    listproductCode,
    countProduct,
    listCode,
    ten: "",
  });
});

router.get("/pagination", checkRequire, async (req, res) => {
  try {
    let page = 1;
    if (req.query.page) {
      page = req.query.page;
    }
    let listproductCode = await productCode
      .find()
      .sort({ createdAt: 1 })
      .skip((page - 1) * 24)
      .limit(24);
    const total = await productCode.count();
    const listcategory = await category.find();
    const listProduct = await productModel.find();

    const listCode = listProduct.filter(function (product, index) {
      return (
        index ===
        listProduct.findIndex((value) => {
          return value.productCode === product.productCode;
        })
      );
    });

    listproductCode = listproductCode.map((product, i) => {
      for (let j = 0; j < listCode.length; j++) {
        if (listCode[j].productCode == product._id) {
          const newProduct = { ...product._doc };
          newProduct.hasData = true;
          return newProduct;
        }
      }
      return product;
    });

    res.render("user/home/pagination", {
      user: req.user,
      listcategory,
      listproductCode: listproductCode,
      listPage: Math.ceil(total / 24),
      currentPage: page,
      total,
      ten: "",
    });
  } catch (error) {
    console.log(error);
  }
});

// Login & Register
router.get("/register", checkUser, async (req, res) => {
  const listcategory = await category.find();
  res.render("user/signUp/signUp", { user: req.user, ten: "", listcategory });
});

router.get("/login", checkUser, async (req, res) => {
  const listcategory = await category.find();
  res.render("user/signIn/signIn", { user: req.user, ten: "", listcategory });
});

router.get("/admin/login", checkUser, (req, res) => {
  res.render("admin/signIn/signIn", { user: req.user });
});

// Profile
router.get("/profile/info", checkLogin, async (req, res) => {
  const listcategory = await category.find();
  res.render("user/profile/info", { user: req.user, ten: "", listcategory });
});

router.get("/profile/order", checkLogin, async (req, res) => {
  const listcategory = await category.find();
  const listOrder = await orderModel.find({
    UserID: req.user._id,
  });
  res.render("user/profile/myOrder", {
    user: req.user,
    listOrder: listOrder.reverse(),
    ten: "",
    listcategory,
  });
});

router.get("/profile/order/:id", checkLogin, async (req, res) => {
  try {
    const listcategory = await category.find();
    let detailOrder = await orderModel
      .findOne({
        _id: req.params.id,
        UserID: req.user._id,
      })
      .populate({
        path: "productList.productID",
        populate: { path: "productCode" },
      });
    // let hour = Math.round( (new Date() - detailOrder.createdAt ) / 3600000)
    // let newOrder = {...detailOrder._doc}
    // if( hour < 24){
    //   newOrder.time = `${hour} giờ`
    // }else if((hour/24/30) < 1){
    //   newOrder.time = `${Math.round(hour/24)} ngày`
    // }else{
    //   newOrder.time = `${Math.round(hour/24/30)} tháng`
    // }
    // console.log(112, {...detailOrder});
    res.render("user/profile/detailOrder", {
      user: req.user,
      detailOrder,
      ten: "",
      listcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mess: "That bai", error });
  }
});

router.get("/profile/favorite", checkLogin, async (req, res) => {
  try {
    var listCode = [];
    let listFavorite = req.user.favorite;
    const listcategory = await category.find();
    for (let i = 0; i < listFavorite.length; i++) {
      const listProductCode = await productCode.findOne({
        _id: listFavorite[i],
      });
      listCode.push(listProductCode);
    }
    res.render("user/profile/favorite", {
      user: req.user,
      ten: "",
      listCode,
      listcategory,
    });
  } catch (error) {
    res.status(500).json({ mess: "Server Error" });
  }
});

router.get("/profile/info/edit", checkLogin, async (req, res) => {
  const listcategory = await category.find();
  res.render("user/profile/edit", { user: req.user, ten: "", listcategory });
});

router.get("/profile/info/change-password", checkLogin, async (req, res) => {
  const listcategory = await category.find();
  res.render("user/profile/changePassword", {
    user: req.user,
    ten: "",
    listcategory,
  });
});

// Admin
router.get("/admin", checkAdmin, function (req, res) {
  res.render("admin/admin");
});

router.get("/orderadmin", async function (req, res) {
  try {
    const dataOrder = [];
    const data = await orderModel.find();
    // console.log(230,data);
    for (let i = 0; i < data.length; i++) {
      if (data[i].productList.length) {
        dataOrder.push(data[i]);
      }
    }
    console.log(239, dataOrder);
    res.render("admin/orderAdmin", { listdata: dataOrder });
  } catch (error) {
    console.log(243, error);
  }
});

router.get("/admin/productCode", async function (req, res) {
  const listproductCode = await productCode.find();
  const listategory = await category.find();
  res.render("admin/productCode", { listproductCode, listategory });
});

router.get("/order", checkLogin, (req, res) => {
  res.render("user/order/order", {
    user: req.user,
    ten: "",
  });
});

// Filter
function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}

router.get("/search", checkRequire, async function (req, res) {
  let dktimkiem = {};
  let searchCondition = {
    nameSearch: {
      $regex: removeAccents(req.query.keyword),
      $options: "i",
    },
  };

  if (req.query.pricemax) {
    searchCondition.price = {
      $lte: req.query.pricemax * 1,
      $gte: req.query.pricemin * 1,
    };
  }

  try {
    const listcategory = await category.find();
    const listProduct = await productModel.find();
    const listSearchNoLimit = await productCode.find(searchCondition);
    let listSearch = await productCode
      .find(searchCondition)
      .skip((req.query.page - 1) * 16)
      .limit(16);
    if (req.query.sort != "popularity") {
      listSearch = await productCode
        .find(searchCondition)
        .sort({ price: req.query.sort == "priceasc" ? 1 : -1 })
        .skip((req.query.page - 1) * 16)
        .limit(16);
    }

    const listCode = listProduct.filter(function (product, index) {
      return (
        index ===
        listProduct.findIndex((value) => {
          return value.productCode === product.productCode;
        })
      );
    });

    listSearch = listSearch.map((product, i) => {
      for (let j = 0; j < listCode.length; j++) {
        if (listCode[j].productCode == product._id) {
          const newProduct = { ...product._doc };
          newProduct.hasData = true;
          return newProduct;
        }
      }
      return product;
    });

    res.render("user/filter/filter", {
      user: req.user,
      dktimkiem,
      min: req.query.pricemin,
      max: req.query.pricemax,
      pagenow: req.query.page,
      ten: req.query.keyword,
      listSearch,
      tongTimDuoc: listSearchNoLimit.length,
      listcategory,
      // list123: listSearch1,
    });
  } catch (err) {
    res.status(500).json({ mess: "zz,thất bại", err });
  }
});

router.get("/dataUserOrder/img&main", async function (req, res) {
  // console.log(276,req.query.id);
  const img = await productModel.findOne({ _id: req.query.id });
  const main = await productCode.findOne({ _id: img.productCode });
  // console.log(279,img.listImg[0], img.color,img.size,main.name);
  res.json({
    img: img.listImg[0],
    color: img.color,
    size: img.size,
    main: main.name,
    price: main.price,
  });
});

module.exports = router;
