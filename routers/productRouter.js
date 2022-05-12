const router = require("express").Router();
const Product = require("../models/product");
const path = require("path");
var multer = require("multer");
var { checkLogin, checkUser } = require("../checkLogin");
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

router.get("/get", async function (req, res) {
  let arr = req.headers.referer.split("/");
  let length = arr.length;
  const listproduct = await Product.find({ productCode: arr[length - 1] })
    .skip((req.query.page - 1) * req.query.limit)
    .limit(req.query.limit);
  res.render("admin/product", { listproduct });
});

router.get("/:id",checkLogin, async function (req, res) {
  const listproduct = await Product.find({ productCode: req.params.id }).limit(
    5
  );
  const a = await (await Product.find({ productCode: req.params.id }))
  const totala = a.length
  const total = Math.ceil(totala / 5);
  res.render("admin/listproduct", { listproduct, total: total });
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
    let arr = req.headers.referer.split("/");
    let length = arr.length;
    const data = await Product.deleteOne({ _id: req.params.id });
    const listproduct = await Product.find({ productCode: arr[length - 1] })
      .skip((req.query.page - 1) * req.query.limit)
      .limit(req.query.limit);
    res.render("admin/product", { listproduct });
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
    let arr = req.headers.referer.split("/");
    let length = arr.length;
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
      const listproduct = await Product.find({ productCode: arr[length - 1] })
        .skip((req.query.page - 1) * req.query.limit)
        .limit(req.query.limit);
      res.render("admin/product", { listproduct });
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
      const listproduct = await Product.find({ productCode: arr[length - 1] })
        .skip((req.query.page - 1) * req.query.limit)
        .limit(req.query.limit);
      res.render("admin/product", { listproduct });
    }
  }
);

module.exports = router;
