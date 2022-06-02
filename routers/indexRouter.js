const router = require("express").Router();
const path = require("path");
const userModel = require("../models/userModel");
const category = require("../models/category");
const productCode = require("../models/productCode");
const productModel = require("../models/product");
const orderModel = require('../models/orderModel')
const { checkUser, checkLogin } = require("../middleWare/checkLogin");
const checkAdmin = require('../middleWare/checkAdmin')
const checkRequire = require("../middleWare/checkRequire");

// Home
router.get("/home", checkRequire, async (req, res) => {
  const listcategory = await category.find();
  let listproductCode = (await productCode.find().sort({createdAt : 1}).limit(12));
  const listProduct = await productModel.find();
  const countProduct = await productCode.count();
  const listCode = listProduct.filter(function(product, index){
    return index === listProduct.findIndex((value)=>{
      return value.productCode === product.productCode
    })
  })

  listproductCode = listproductCode.map((product, i) => { 
    for(let j = 0;j<listCode.length;j++){
      if(listCode[j].productCode == product._id){
        const newProduct = {...product._doc}
        newProduct.hasData = true
        return newProduct
      }
    }
    return product
  })

  res.render("user/home/home", {
    user: req.user,
    listcategory,
    listproductCode ,
    countProduct,
    listCode
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
      .sort({createdAt : 1})
      .skip((page - 1) * 24)
      .limit(24);
    const total = await productCode.count();
    const listProduct = await productModel.find();
    const listCode = listProduct.filter(function(product, index){
      return index === listProduct.findIndex((value)=>{
        return value.productCode === product.productCode
      })
    })
  
    listproductCode = listproductCode.map((product, i) => { 
      for(let j = 0;j<listCode.length;j++){
        if(listCode[j].productCode == product._id){
          const newProduct = {...product._doc}
          newProduct.hasData = true
          return newProduct
        }
      }
      return product
    })

    res.render("user/home/pagination", {
      user: req.user,
      listproductCode : listproductCode,
      listPage: Math.ceil(total / 24),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.log(error);
  }
});

// Login & Register
router.get("/register",checkUser,  (req, res) => {
  res.render("user/signUp/signUp", { user: req.user });
});

router.get("/login",checkUser, (req, res) => {
  res.render("user/signIn/signIn", { user: req.user });
});

router.get("/admin/login", checkUser, (req, res) => {
  res.render("admin/signIn/signIn", { user: req.user });
});

// Profile
router.get("/profile/info", checkLogin, (req, res) => {
  res.render("user/profile/info", { user: req.user });
});

router.get("/profile/order", checkLogin, async (req, res) => {
  const listOrder = await orderModel.find({
    UserID : req.user._id
  })
  res.render("user/profile/myOrder", { user: req.user , listOrder : listOrder.reverse() });
});

router.get('/profile/order/:id' ,checkLogin, async (req,res) => {
  try {
    let detailOrder = await orderModel.findOne({
      _id : req.params.id,
      UserID : req.user._id,
    }).populate({path : 'productList.productID', populate : {path : 'productCode'}})
    console.log(detailOrder.productList[0]);  
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
    res.render('user/profile/detailOrder', {
      user : req.user,
      detailOrder
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({mess : 'That bai',error })
  }
})

router.get("/profile/info/edit", checkLogin, (req, res) => {
  res.render("user/profile/edit", { user: req.user });
});

router.get("/profile/info/change-password", checkLogin, (req, res) => {
  res.render("user/profile/changePassword", { user: req.user });
});

// Admin
router.get("/admin" ,checkAdmin , function (req, res) {
  res.render("admin/admin");
});

router.get("/orderadmin",async function (req, res) {
  try {
    const dataOrder = [];
    const data = await orderModel.find();
    // console.log(230,data);
    for (let i = 0; i < data.length; i++) {
      if (data[i].productList.length) {
        dataOrder.push(data[i])
      }
    }
    console.log(239,dataOrder);
    res.render("admin/orderAdmin", {listdata : dataOrder});
  } catch (error) {
    console.log(243,error);
  }
});

router.get("/admin/productCode", async function (req, res) {
  const listproductCode = await productCode.find();
  const listategory = await category.find();
  res.render("admin/productCode", { listproductCode, listategory });
});


// router.post("/search/?size",checkRequire, function (req, res) {
//   productModel
//     .create({
//       quantity: req.body.quantity,
//       size: req.body.size,
//       color: req.body.color,
//     })
//     .then(function (data) {
//       res.json({ mess: "ok", data });
//     })
//     .catch(function (err) {
//       res.json({ mess: "thất bại", err });
//     });
// });

router.get("/cart", checkLogin, (req, res) => {
  res.render("user/cart/cart", {
    user : req.user,
  });
});

router.get("/order", checkLogin, (req, res) => {
  res.render("user/order/order");
});

router.get("/search",checkRequire, async function (req, res) {
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
      const listproduct1 = await productModel.find();
      const listSearchNoLimit = await productCode.find(dktimkiem1)
      const listSearch = await productCode.find(dktimkiem1)
        .limit(req.query.limit)
        .skip((req.query.page - 1) * req.query.limit);
      const listSearch1 = await productCode.find({
        name: { $regex: req.query.search, $options: "i" },
      });
      res.render("user/filter/filter", {
        user: req.user,
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
    } catch (err) {
      res.status(500).json({ mess: "zz,thất bại", err });
    }
  });

router.get("/cart", checkUser, (req, res) => {
  res.render("user/cart/cart");
});

module.exports = router;
