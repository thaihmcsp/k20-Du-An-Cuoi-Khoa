const router = require("express").Router();
const UserModel = require("../models/userModel");
const ProductModel = require("../models/product");
const ProductCodeModel = require("../models/productCode");
const CartModel = require("../models/cartModel");
const { checkLogin, checkUser } = require("../middleWare/checkLogin");

router.get("/", checkLogin, async (req, res) => {
  try {
    const dataObject = await renderCart(req.id);
    for (var j = 0; j < dataObject.arrCode.length; j++) {
      for (var i = 0; i < dataObject.data.length; i++) {
        console.log(90, dataObject.arrproductcode[i].price);
      }
    }
    res.render("user/cart/cart", { ...dataObject, user: req.user });
  } catch (error) {
    console.log(error);
  }
});

async function renderCart(UserID) {
  try {
    console.log(9, UserID);
    let sumprice = 0;
    let sumCart = 0;
    let sumarrorder = 0;
    const arrorder = [];
    const arrprice = [];
    const arrproduct = [];
    const arrproductcode = [];
    const arrCode = [];
    const data = await CartModel.find({ UserID: UserID });
    for (let k = 0; k < data.length; k++) {
      const order = data[k].productList[0].select;
      if (order === true) {
        arrorder.push(data[k]);
      }
      const product = await ProductModel.findOne({
        _id: data[k].productList[0].productID,
      });
      arrproduct.push(product);
      const productcode = await ProductCodeModel.findOne({
        _id: product.productCode,
      });
      arrproductcode.push(productcode);
      sumCart += data[k].productList[0].quantity; // số lượng sản phẩm order

      if (arrCode.indexOf(product.productCode) === -1) {
        arrCode.push(product.productCode);
      }
    }
    // console.log(33,arrorder);
    for (let m = 0; m < arrorder.length; m++) {
      // console.log(33, arrorder[m].productList[0].quantity);
      const productorder = await ProductModel.findOne({
        _id: arrorder[m].productList[0].productID,
      });
      // console.log(34,productorder);
      const productcodeprice = await ProductCodeModel.findOne({
        _id: productorder.productCode,
      });
      arrprice.push(
        productcodeprice.price * arrorder[m].productList[0].quantity
      ); // giá * số lượng order
      sumarrorder += arrorder[m].productList[0].quantity; // số lượng sản phẩm order
    }

    for (let u = 0; u < arrprice.length; u++) {
      sumprice += arrprice[u];
    }
    sumprice = sumprice.toLocaleString("vi"); // Định dạng phân cách bàng dấu chấm
    // console.log(44,arrproduct);
    // console.log(45,sumarrorder);
    // console.log(46,arrprice);
    // console.log(47,sumprice);
    // console.log(48,arrproductcode);
    // console.log(49,sumCart);
    console.log(50, arrCode);

    return {
      data: data,
      arrorder: arrorder,
      arrprice: arrprice,
      sumprice,
      sumarrorder,
      sumCart,
      arrproduct: arrproduct,
      arrproductcode: arrproductcode,
      arrCode: arrCode,
    };
  } catch (error) {
    console.log(error);
  }
}

router.post("/create", checkLogin, async (req, res) => {
  try {
    const data = await CartModel.create({
      productList: {
        productID: req.body.productID,
        quantity: req.body.quantity,
      },
      UserID: req.id,
    });
    console.log(data);
    res.status(200).json({ message: "Successfull" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/update", checkUser, async (req, res) => {
  try {
    console.log(70, req.body.productID);
    if (req.body.i) {
      const data1 = await CartModel.updateOne(
        { "productList.productID": req.body.productID },
        { "productList.$.quantity": req.body.quantity }
      );

      const dataObject = await renderCart(req.id);
      res.render("user/cart/homecart", dataObject);
    } else {
      const data = await CartModel.updateOne(
        { "productList.productID": req.body.productID },
        { $inc: { "productList.$.quantity": req.body.quantity } }
      );
      // Since 'productList ' is an array, you will need to use an array operator for updating just the one element.
      // In this case, since the query uniquely identifies one element, you can use the $ positional operator, like
      res.json(data);
    }
  } catch (error) {
    console.log(error);
  }
});
router.put("/up", checkUser, async (req, res) => {
  try {
    console.log(70, req.body.productID);
    const data = await CartModel.updateOne(
      { "productList.productID": req.body.productID },
      { $inc: { "productList.$.quantity": 1 } }
    );
    const dataObject = await renderCart(req.id);
    res.render("user/cart/homecart", dataObject);
  } catch (error) {
    console.log(error);
  }
});
router.put("/down", checkUser, async (req, res) => {
  try {
    console.log(70, req.body.productID);
    const data = await CartModel.updateOne(
      { "productList.productID": req.body.productID },
      { $inc: { "productList.$.quantity": -1 } }
    );
    const dataObject = await renderCart(req.id);
    res.render("user/cart/homecart", dataObject);
  } catch (error) {
    console.log(error);
  }
});
router.put("/test", checkUser, async (req, res) => {
  try {
    console.log(72, req.body.productID, req.body.select);
    const data = await CartModel.updateOne(
      { "productList.productID": req.body.productID },
      { "productList.$.select": req.body.select }
    );
    const dataObject = await renderCart(req.id);
    res.render("user/cart/homecart", dataObject);
  } catch (error) {
    console.log(error);
  }
});
router.put("/testall", checkUser, async (req, res) => {
  try {
    console.log(82, req.id);
    console.log(83, req.body.select);
    const data1 = await CartModel.updateMany(
      { UserID: req.id },
      { "productList.$[].select": req.body.select },
      { multi: true }
    );

    const dataObject = await renderCart(req.id);
    res.render("user/cart/homecart", dataObject);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/xoa", checkUser, async (req, res) => {
  try {
    console.log(70, req.body.productID);
    const data = await CartModel.deleteOne({
      "productList.productID": req.body.productID,
    });
    const dataObject = await renderCart(req.id);
    res.render("user/cart/homecart", dataObject);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/xoaAll", checkUser, async (req, res) => {
  try {
    const data = await CartModel.deleteMany({ UserID: req.id });
    const dataObject = await renderCart(req.id);
    res.render("user/cart/homecart", dataObject);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
