const router = require("express").Router();
const ProductModel = require("../models/product");
const ProductCodeModel = require("../models/productCode");
const CartModel = require("../models/cartModel");
const OrderModel = require("../models/orderModel");
const { checkUser, checkLogin } = require("../middleWare/checkLogin");
const cookieParser = require("cookie-parser");
const UserModel = require("../models/userModel");
router.use(cookieParser());

router.post("/create", checkUser, async (req, res) => {
  try {
    console.log(
      11,
      req.body.name,
      req.body.phone,
      req.body.address,
      req.body.type
    );
    const data = await OrderModel.create({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      type: req.body.type,
      UserID: req.id,
    });
    console.log(14, data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});
router.post("/create1", checkUser, async (req, res) => {
  try {
    console.log(
      11,
      req.body.name,
      req.body.phone,
      req.body.address,
      req.body.type
    );
    const data = await OrderModel.create({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      type: req.body.type,
      UserID: req.id,
    });
    console.log(14, data);
    const add = await OrderModel.find({ UserID: req.id, productList: [] });
    console.log(29, add);
    res.render("user/order/addressorder", { add: add });
  } catch (error) {
    console.log(error);
  }
});

async function renderCart(UserID) {
  try {
    console.log(9, UserID);
    let sumprice = 0;
    let sumCart = 0;
    const arrprice = [];
    const arrproduct = [];
    const arrproductcode = [];
    const arrCode = [];
    const N = [];
    const add = await OrderModel.find({ UserID: UserID, productList: [] });
    const user = await UserModel.findOne({ UserID: UserID });
    const email = user.email;
    const data = await CartModel.find({
      UserID: UserID,
      "productList.select": true,
    });
    // console.log(34,data);
    for (let k = 0; k < data.length; k++) {
      const product = await ProductModel.findOne({
        _id: data[k].productList[0].productID,
      });
      arrproduct.push(product);
      const productcode = await ProductCodeModel.findOne({
        _id: product.productCode,
      });
      arrproductcode.push(productcode);
      sumCart += data[k].productList[0].quantity; // số lượng sản phẩm order
      // console.log(444,k);
      if (arrCode.indexOf(product.productCode) === -1) {
        // console.log(48,k);
        arrCode.push(product.productCode);
      }
    }
    for (let i = 0; i < arrCode.length; i++) {
      N.push("g" + i);
      for (let j = 0; j < arrproduct.length; j++) {
        // console.log(i);
        if (arrCode.indexOf(arrproduct[j].productCode) === i) {
          // console.log(54,j);
          N.push(j);
        }
      }
    }
    for (let m = 0; m < data.length; m++) {
      // console.log(33, data[m].productList[0].quantity);
      const productorder = await ProductModel.findOne({
        _id: data[m].productList[0].productID,
      });
      // console.log(34,productorder);
      const productcodeprice = await ProductCodeModel.findOne({
        _id: productorder.productCode,
      });
      arrprice.push(productcodeprice.price * data[m].productList[0].quantity); // giá * số lượng order
      // sumarrorder += data[m].productList[0].quantity // số lượng sản phẩm order
    }

    for (let u = 0; u < arrprice.length; u++) {
      sumprice += arrprice[u];
    }
    sumprice = sumprice.toLocaleString("vi"); // Định dạng phân cách bàng dấu chấm
    // console.log(64,arrproduct);
    console.log(68, arrproductcode);
    // console.log(45,sumCart);
    console.log(47, sumprice);
    // console.log(70,arrCode);
    // console.log(71,N);
    for (let i = 0; i < arrCode.length; i++) {
      arrCode[i] = N.indexOf("g" + i);
      // console.log(85,N.indexOf('g'+i));
    }
    // console.log(arrCode);
    for (let i = 0; i < arrCode.length; i++) {
      arrCode[i] = N.slice(arrCode[i] + 1, arrCode[i + 1]);
    }
    // console.log(89,arrCode);
    console.log(90, add);

    return {
      data: data,
      arrprice: arrprice,
      sumprice,
      sumCart,
      email: email,
      arrproduct: arrproduct,
      arrproductcode: arrproductcode,
      arrCode: arrCode,
      N: N,
      add: add,
    };
  } catch (error) {
    console.log(error);
  }
}

router.get("/",checkLogin , async (req, res) => {
  try {
    const dataObject = await renderCart(req.id);
    res.render("user/order/order", {...dataObject, user: req.user});
  } catch (error) {
    console.log(error);
  }
});
router.get("/checkadress", checkUser, async (req, res) => {
  try {
    const data = await OrderModel.findOne({ UserID: req.id, productList: [] });
    // console.log(105,data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/xoa", checkUser, async (req, res) => {
  try {
    console.log(113, req.body.productID);
    const data = await CartModel.deleteOne({
      "productList.productID": req.body.productID,
    });
    console.log(115, data);
    const dataObject = await renderCart(req.id);
    res.render("user/order/homeorder", dataObject);
  } catch (error) {
    console.log(error);
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

router.put('/:id' ,async (req,res) => {
  try {
    await OrderModel.updateOne({
      _id : req.params.id
    }, {
      status : 'cancel'
    })
    res.status(200).json({mess : 'Thanh cong'})
  } catch (error) {
    res.status(400).json({mess : 'That bai'})
  }
})

module.exports = router;
