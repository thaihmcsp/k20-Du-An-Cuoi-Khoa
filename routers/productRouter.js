const router = require("express").Router();
const path = require("path");
const ProductModel = require("../models/product");
const ProductCodeModel = require("../models/productCode");
const CartModel = require("../models/cartModel");
const cookieParser = require("cookie-parser");
const { checkLogin, checkUser } = require("../middleWare/checkLogin");
const checkRequire = require("../middleWare/checkRequire");
router.use(cookieParser());
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.get("/detail/:id", checkRequire, async (req, res) => {
  try {
    console.log(7, req.params.id);
    // console.log(109,req.query.color);
    // console.log(109,req.query.size);
    const ListCode = await ProductCodeModel.findOne({ _id: req.params.id });
    const ListData = await ProductModel.find({ productCode: req.params.id });
    let color = [];
    let size = [];
    const queryColor = [];
    const querySize = [];
    for (let i = 0; i < ListData.length; i++) {
      if (color.indexOf(ListData[i].color) === -1) {
        color.push(ListData[i].color, i);
      }
      if (size.indexOf(ListData[i].size) === -1) {
        size.push(ListData[i].size, i);
      }
    }
    if (req.query.color) {
      queryColor.push(req.query.color);
    }
    if (req.query.size) {
      querySize.push(req.query.size);
    }
    console.log(50, ListData);
    // console.log(200,color);
    // console.log(300,size);
    // console.log(2000,ListCode);
    // console.log(3000,ListData);
    res.render("user/detail/detail", {
      user: req.user,
      listdata: ListData,
      listcode: ListCode,
      listcolor: color,
      listsize: size,
      queryColor,
      querySize,
      ten: "",
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/change/mau", async (req, res) => {
  try {
    console.log(36, req.query.mau);
    // console.log(37,req.query.idcode);
    const ListData = await ProductModel.find({
      color: req.query.mau,
      productCode: req.query.idcode,
    });
    console.log(39, ListData);
    res.render("user/detail/zoomImg.ejs", { listdata: ListData });
  } catch (error) {
    console.log(error);
  }
});

router.get("/check/:color&:size&:id&:quantity", checkUser, async (req, res) => {
  try {
    console.log(77, req.params);
    const ListData = await ProductModel.findOne({
      size: req.params.size,
      color: req.params.color,
      productCode: req.params.id,
    });
    // console.log(79,ListData);
    // console.log(80,ListData.quantity );// số lượng hàng ban đầu
    // console.log(81,req.params.quantity); // số lượng hàng muốn đặt mua
    const data = await CartModel.findOne({
      UserID: req.id,
      "productList.productID": ListData._id,
    });
    if (data) {
      // console.log(82,data.productList[0].quantity); // số lượng hàng đã bỏ vào cart
      if (
        ListData.quantity <
        Number(req.params.quantity) + data.productList[0].quantity
      ) {
        res.json({ mess: "Hàng tồn không đủ", quantity: ListData.quantity });
      } else {
        res.json(ListData);
      }
    } else {
      if (ListData.quantity < Number(req.params.quantity)) {
        res.json({ mess: "Hàng tồn không đủ", quantity: ListData.quantity });
      } else {
        res.json(ListData);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/check/size", async (req, res) => {
  try {
    const size = [];
    console.log(91, req.query.mau);
    const ListData = await ProductModel.find({
      color: req.query.mau,
      productCode: req.query.idcode,
    });
    // console.log(52,ListData);
    for (let i = 0; i < ListData.length; i++) {
      if (size.indexOf(ListData[i].size) === -1) {
        size.push(ListData[i].size);
      }
    }
    // console.log(44444,size);
    res.json(size);
  } catch (error) {
    console.log(error);
  }
});

router.get("/check/color", async (req, res) => {
  try {
    const color = [];
    console.log(61, req.query.size);
    const ListData = await ProductModel.find({
      size: req.query.size,
      productCode: req.query.idcode,
    });
    // console.log(63,ListData);
    for (let i = 0; i < ListData.length; i++) {
      if (color.indexOf(ListData[i].color) === -1) {
        color.push(ListData[i].color);
      }
    }
    // console.log(5555,color);
    res.json(color);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async function (req, res) {
  const listproduct = await ProductModel.find({ productCode: req.params.id });
  const total = listproduct.length;
  res.render("admin/listproduct", { listproduct, total });
});

router.get("/get", async function (req, res) {
  let arr = req.headers.referer.split("/");
  let length = arr.length;
  const listproduct = await ProductModel.find({ productCode: arr[length - 1] })
    .skip((req.query.page - 1) * req.query.limit)
    .limit(req.query.limit);
  res.render("admin/product", { listproduct });
});

router.get("/:id", checkLogin, async function (req, res) {
  const listproduct = await ProductModel.find({
    productCode: req.params.id,
  }).limit(5);
  const a = await await ProductModel.find({ productCode: req.params.id });
  const totala = a.length;
  const total = Math.ceil(totala / 5);
  res.render("admin/listproduct", { listproduct, total: total });
});

router.get("/change/mau", async (req, res) => {
  try {
    console.log(36, req.query.mau);
    // console.log(37,req.query.idcode);
    const ListData = await ProductModel.find({
      color: req.query.mau,
      productCode: req.query.idcode,
    });
    console.log(39, ListData);
    res.render("user/detail/zoomImg.ejs", { listdata: ListData });
  } catch (error) {
    console.log(56, error);
  }
});
// router.get("/check/size", async (req, res) => {
//   try {
//     const size = [];
//     console.log(91, req.query.mau);
//     const ListData = await ProductModel.find({
//       color: req.query.mau,
//       productCode: req.query.idcode,
//     });
//     // console.log(52,ListData);
//     for (let i = 0; i < ListData.length; i++) {
//       if (size.indexOf(ListData[i].size) === -1) {
//         size.push(ListData[i].size);
//       }
//     }
//     // console.log(44444,size);
//     res.json(size);
//   } catch (error) {
//     console.log(error);
//   }
// });
// router.get("/check/color", async (req, res) => {
//   try {
//     const color = [];
//     console.log(61, req.query.size);
//     const ListData = await ProductModel.find({
//       size: req.query.size,
//       productCode: req.query.idcode,
//     });
//     // console.log(63,ListData);
//     for (let i = 0; i < ListData.length; i++) {
//       if (color.indexOf(ListData[i].color) === -1) {
//         color.push(ListData[i].color);
//       }
//     }
//     // console.log(5555,color);
//     res.json(color);
//   } catch (error) {
//     console.log(error);
//   }
// });
// router.get("/check/:color&:size&:id&:quantity", checkUser, async (req, res) => {
//   try {
//     console.log(77, req.params);
//     const ListData = await ProductModel.findOne({
//       size: req.params.size,
//       color: req.params.color,
//       productCode: req.params.id,
//     });
//     // console.log(79,ListData);
//     // console.log(80,ListData.quantity );// số lượng hàng ban đầu
//     // console.log(81,req.params.quantity); // số lượng hàng muốn đặt mua
//     const data = await CartModel.findOne({
//       UserID: req.id,
//       "productList.productID": ListData._id,
//     });
//     if (data) {
//       // console.log(82,data.productList[0].quantity); // số lượng hàng đã bỏ vào cart
//       if (
//         ListData.quantity <
//         Number(req.params.quantity) + data.productList[0].quantity
//       ) {
//         res.json({ mess: "Hàng tồn không đủ", quantity: ListData.quantity });
//       } else {
//         res.json(ListData);
//       }
//     } else {
//       if (ListData.quantity < Number(req.params.quantity)) {
//         res.json({ mess: "Hàng tồn không đủ", quantity: ListData.quantity });
//       } else {
//         res.json(ListData);
//       }
//     }
//   } catch (error) {
//     console.log(119, error);
//   }
// });

router.post("/add", upload.array("listImg", 5), async function (req, res) {
  let arr = req.headers.referer.split("/");
  let length = arr.length;
  var arrimg = [];
  for (let i = 0; i < req.files.length; i++) {
    arrimg.push(req.files[i].path);
  }
  const data = await ProductModel.create({
    listImg: arrimg,
    color: req.body.color,
    size: req.body.size,
    productCode: arr[length - 1],
    quantity: req.body.quantity,
  });
  res.json(data);
});

router.delete("/:id", async function (req, res) {
  try {
    await ProductModel.deleteOne({ _id: req.params.id });
    const listproduct = await ProductModel.find();
    res.render("admin/product", { listproduct });
  } catch (error) {
    res.status(400).json({ mess: "Failed" });
  }
});

router.get("/get/:idup", async function (req, res) {
  const data = await ProductModel.findOne({ _id: req.params.idup });
  res.json(data);
});

router.put(
  "/:idupdate",
  upload.array("listimgid", 5),
  async function (req, res) {
    let arr = req.headers.referer.split("/");
    let length = arr.length;
    var arrimg = [];
    for (let i = 0; i < req.files.length; i++) {
      arrimg.push(req.files[i].path);
    }
    if (arrimg.length == 0) {
      const update = await ProductModel.updateOne(
        { _id: req.params.idupdate },
        {
          color: req.body.colorid,
          size: req.body.sizeid,
          quantity: req.body.quantityid,
        }
      );
      const listproduct = await ProductModel.find({
        productCode: arr[length - 1],
      });
      // .skip((req.query.page - 1) * req.query.limit)
      // .limit(req.query.limit);
      res.render("admin/product", { listproduct });
    } else {
      const update = await ProductModel.updateOne(
        { _id: req.params.idupdate },
        {
          listImg: arrimg,
          color: req.body.colorid,
          size: req.body.sizeid,
          quantity: req.body.quantityid,
        }
      );
      const listproduct = await ProductModel.find({
        productCode: arr[length - 1],
      })
        .skip((req.query.page - 1) * req.query.limit)
        .limit(req.query.limit);
      res.render("admin/product", { listproduct });
    }
  }
);

router.get("/", function (req, res) {
  console.log(req.query.color);
  ProductModel.find({ color: { $regex: req.query.color, $options: "i" } })
    .then(function (data) {
      res.json({ mess: "ok", data });
    })
    .catch(function (err) {
      res.json({ mess: "thất bại", err });
    });
});

router.post("/", function (req, res) {
  console.log(req.body);
  ProductModel.create({
    color: req.body.color,
    size: req.body.size,
    quantity: req.body.quantity,
  })
    .then(function (data) {
      res.json({ mess: "ok", data });
    })
    .catch(function (err) {
      res.json({ mess: "thất bại", err });
    });
});

router.get("/:id", async (req, res) => {
  try {
    console.log(7, req.params.id);
    const ListData = await ProductModel.findOne({ _id: req.params.id });
    console.log(8, ListData);
    const ListCode = await ProductCodeModel.findOne({
      _id: ListData.productCode,
    });
    console.log(9, ListCode);
    // res.json(ListData)
    res.render("user/detail/detail", {
      listdata: ListData,
      listcode: ListCode,
    });
  } catch (error) {
    console.log(error);
  }
});
// router.get('/home', async (req, res) =>{
//     try {
//         // console.log(7,req.params.id);
//         // const ListData = await ProductModel.find({_id : req.params.id})
//         // console.log(8,ListData);
//         res.render('user/detail/detail')
//     } catch (error) {
//         console.log(error);
//     }
// })
// router.get('/list',checkUser, async (req, res) =>{
//     try {
//         console.log(91, req.cookies.user);
//         const User = await UserModel.findOne({token: req.cookies.user})
//         const ListData = await ListModel.find({userID: User._id})
//         res.render('page/list', {user : User, listdata: ListData})
//     } catch (error) {
//         console.log(error);
//     }
// })

module.exports = router;
