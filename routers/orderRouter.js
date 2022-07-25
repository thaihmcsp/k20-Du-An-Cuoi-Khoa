const router = require("express").Router();
const ProductModel = require("../models/product");
const ProductCodeModel = require("../models/productCode");
const CartModel = require("../models/cartModel");
const OrderModel = require("../models/orderModel");
const UserModel = require("../models/userModel");
const { checkUser, checkLogin } = require("../middleWare/checkLogin");
const CategoryModel = require("../models/category");

router.get("/:id", checkLogin, async (req, res) => {
  try {
    const listcategory = await CategoryModel.find();
    if (req.query.result == "checkout") {
      const cartUser = await CartModel.findOne({
        _id: req.params.id,
      }).populate({
        path: "productList.productID",
        populate: { path: "productCode" },
      });
      if (cartUser) {
        const listSelect = cartUser.productList.filter((value) => {
          return value.select;
        });
        if (listSelect.length > 0) {
          var totalPrice = 0;
          for (let i = 0; i < listSelect.length; i++) {
            totalPrice +=
              listSelect[i].quantity *
              listSelect[i].productID.productCode.price;
          }
          res.render("user/order/order", {
            user: req.user,
            ten: "",
            listcategory,
            cartID: cartUser._id,
            totalPrice,
            sumCart: listSelect.length,
            listSelect,
          });
        } else {
          res.status(400).json({ mess: "List Empty" });
        }
      } else {
        res.status(400).json({
          mess: "Failed",
        });
      }
    } else if (req.query.result == "success") {
      res.render("user/order/successOrder", {
        user: req.user,
        ten: "",
        listcategory,
      });
    } else {
      res.status(400).json({ mess: "Failed" });
    }
  } catch (error) {
    res.status(500).json({ mess: "Server Error" });
  }
});

router.post("/create", checkLogin, async (req, res) => {
  try {
    const cartUser = await CartModel.findOne({
      UserID: req.id,
    });
    if (cartUser) {
      const listRemain = cartUser.productList.filter((value) => {
        return !value.select;
      });
      await CartModel.updateOne(
        {
          UserID: req.id,
        },
        {
          productList: listRemain,
        }
      );
      const listBuy = cartUser.productList.filter((value) => {
        return value.select;
      });
      var listData = [];
      for (let i = 0; i < listBuy.length; i++) {
        listData.push({
          productID: listBuy[i].productID,
          quantity: listBuy[i].quantity,
          size: listBuy[i].size,
        });
      }
      await OrderModel.create({
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        type: req.body.type,
        total: req.body.total * 1,
        UserID: req.id,
        productList: listData,
      });
      res.status(200).json({ mess: "Successfull" });
    } else {
      res.status(400).json({ mess: "Failed" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/xoa", checkLogin, async (req, res) => {
  try {
    const cartUser = await CartModel.findOne({
      UserID: req.id,
    });
    if (cartUser) {
      const remainsProduct = cartUser.productList.filter((value) => {
        return value.productID !== req.body.productID;
      });
      await CartModel.updateOne(
        {
          UserID: req.id,
        },
        {
          productList: remainsProduct,
        }
      );
      res.status(200).json({ mess: "Successfull" });
    } else {
      res.status(400).json({ mess: "Failed" });
    }
  } catch (error) {
    res.status(500).json({ mess: "Server Error" });
  }
});

router.put("/:id", checkLogin, async (req, res) => {
  try {
    await OrderModel.updateOne(
      {
        _id: req.params.id,
      },
      {
        status: "done",
      }
    );
    res.status(200).json({ mess: "Successfull" });
  } catch (error) {
    res.status(500).json({ mess: "Server Error" });
  }
});

router.post("/Neworder", checkUser, async (req, res) => {
  try {
    const dataObject = await renderCart(req.id);
    let dataorder = [];
    for (let i = 0; i < dataObject.data.length; i++) {
      // console.log(dataObject.data[i].productList[0]);
      dataorder.push(dataObject.data[i].productList[0]);
    }
    // console.log(132,dataorder,req.body._id, req.body.total);
    const data = await OrderModel.create({
      UserID: req.id,
      productList: dataorder,
      total: req.body.total,
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      type: req.body.type,
    });
    console.log(data);
    const datadeleteCart = await CartModel.deleteMany({
      UserID: req.id,
      "productList.select": true,
    });
    console.log(datadeleteCart);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.put("/cancel/:id", checkLogin, async (req, res) => {
  try {
    await OrderModel.updateOne(
      {
        _id: req.params.id,
      },
      {
        status: "cancel",
      }
    );
    res.status(200).json({ mess: "Thanh cong" });
  } catch (error) {
    res.status(500).json({ mess: "That bai" });
  }
});

module.exports = router;
