const router = require("express").Router();
const Product = require("../models/product");
const path = require("path");
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

router.get("/:id", async function (req, res) {
  const listproduct = await Product.find({ productCode: req.params.id });
  res.render("admin/listproduct", { listproduct });
});

router.post("/add", upload.array("listImg", 5), async function (req, res) {
  let arr = req.headers.referer.split("/");
  let length = arr.length;
  var arrimg = [];
  for (let i = 0; i < req.files.length; i++) {
    arrimg.push(req.files[i].path);
  }
  const data = await Product.create({
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
    const data = await Product.deleteOne({ _id: req.params.id });
    res.json(data);
  } catch (error) {
    console.log(47, error);
  }
});

router.get("/get/:idup", async function (req, res) {
  const data = await Product.findOne({ _id: req.params.idup });
  res.json(data);
});

router.put(
  "/:idupdate",
  upload.array("listimgid", 5),
  async function (req, res) {
    var arrimg = [];
    for (let i = 0; i < req.files.length; i++) {
      arrimg.push(req.files[i].path);
    }
    if (arrimg.length == 0) {
      const update = await Product.updateOne(
        { _id: req.params.idupdate },
        {
          color: req.body.colorid,
          size: req.body.sizeid,
          quantity: req.body.quantityid,
        }
      );
      res.json(update);
    } else {
      const update = await Product.updateOne(
        { _id: req.params.idupdate },
        {
          listImg: arrimg,
          color: req.body.colorid,
          size: req.body.sizeid,
          quantity: req.body.quantityid,
        }
      );
      res.json(update);
    }
  }
);

router.get("/", function (req, res) {
  console.log(req.query.color);
  Product.find({ color: { $regex: req.query.color, $options: "i" } })
    .then(function (data) {
      res.json({ mess: "ok", data });
    })
    .catch(function (err) {
      res.json({ mess: "thất bại", err });
    });
});

router.post("/", function (req, res) {
  console.log(req.body);
  Product.create({
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
